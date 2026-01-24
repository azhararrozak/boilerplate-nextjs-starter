import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import {
  subscription,
  subscriptionPlan,
  paymentTransaction,
} from "@/db/schema";
import { eq } from "drizzle-orm";

// Midtrans Snap API
const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || "";
const MIDTRANS_IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === "true";
const MIDTRANS_API_URL = MIDTRANS_IS_PRODUCTION
  ? "https://app.midtrans.com/snap/v1/transactions"
  : "https://app.sandbox.midtrans.com/snap/v1/transactions";

// Debug: Log to verify key is loaded (remove in production)
console.log("Midtrans Config:", {
  hasServerKey: !!MIDTRANS_SERVER_KEY,
  serverKeyPrefix: MIDTRANS_SERVER_KEY.substring(0, 10),
  isProduction: MIDTRANS_IS_PRODUCTION,
  apiUrl: MIDTRANS_API_URL,
});

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { planId } = await request.json();

    if (!planId) {
      return NextResponse.json(
        { error: "Plan ID is required" },
        { status: 400 },
      );
    }

    // Get plan details
    const [plan] = await db
      .select()
      .from(subscriptionPlan)
      .where(eq(subscriptionPlan.id, planId))
      .limit(1);

    if (!plan) {
      return NextResponse.json({ error: "Plan not found" }, { status: 404 });
    }

    // Free plan doesn't need payment
    if (plan.price === "0") {
      // Create free subscription
      const timestamp = Date.now();
      const randomSuffix = Math.random().toString(36).substring(2, 8);
      const subscriptionId = `sub_${timestamp}_${randomSuffix}`;

      await db.insert(subscription).values({
        id: subscriptionId,
        userId: session.user.id,
        planId: plan.id,
        status: "active",
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
      });

      return NextResponse.json({
        success: true,
        message: "Free subscription activated",
      });
    }

    // Create subscription record
    // Generate short IDs to comply with Midtrans limits (order_id max 50 chars)
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).substring(2, 8);

    const subscriptionId = `sub_${timestamp}_${randomSuffix}`;
    const transactionId = `trx_${timestamp}_${randomSuffix}`;
    const orderId = `ORD${timestamp}${randomSuffix}`; // Max 50 chars

    await db.insert(subscription).values({
      id: subscriptionId,
      userId: session.user.id,
      planId: plan.id,
      status: "inactive", // Will be activated after payment
    });

    // Create payment transaction
    await db.insert(paymentTransaction).values({
      id: transactionId,
      subscriptionId,
      userId: session.user.id,
      amount: plan.price,
      currency: "IDR",
      status: "pending",
      midtransOrderId: orderId,
    });

    // Prepare Midtrans transaction
    const parameter = {
      transaction_details: {
        order_id: orderId,
        gross_amount: parseInt(plan.price),
      },
      customer_details: {
        first_name: session.user.name || "Customer",
        email: session.user.email,
      },
      item_details: [
        {
          id: plan.id,
          price: parseInt(plan.price),
          quantity: 1,
          name: `${plan.name} Subscription - ${plan.interval}`,
        },
      ],
      callbacks: {
        finish: `${process.env.NEXT_PUBLIC_APP_URL}/subscription/success`,
        error: `${process.env.NEXT_PUBLIC_APP_URL}/subscription/error`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/subscription/pending`,
      },
    };

    // Call Midtrans Snap API
    const authString = Buffer.from(MIDTRANS_SERVER_KEY + ":").toString(
      "base64",
    );

    const midtransResponse = await fetch(MIDTRANS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${authString}`,
        Accept: "application/json",
      },
      body: JSON.stringify(parameter),
    });

    const midtransData = await midtransResponse.json();

    if (!midtransResponse.ok) {
      console.error("Midtrans error:", midtransData);
      return NextResponse.json(
        { error: "Failed to create payment", details: midtransData },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      token: midtransData.token,
      redirectUrl: midtransData.redirect_url,
      orderId: orderId,
    });
  } catch (error) {
    console.error("Subscription creation error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
