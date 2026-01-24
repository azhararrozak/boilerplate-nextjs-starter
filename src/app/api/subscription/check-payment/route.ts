import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { subscription, paymentTransaction } from "@/db/schema";
import { eq } from "drizzle-orm";

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || "";
const MIDTRANS_IS_PRODUCTION = process.env.MIDTRANS_IS_PRODUCTION === "true";

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get("orderId");

    if (!orderId) {
      return NextResponse.json({ error: "Order ID required" }, { status: 400 });
    }

    // Get transaction from database
    const [transaction] = await db
      .select()
      .from(paymentTransaction)
      .where(eq(paymentTransaction.midtransOrderId, orderId))
      .limit(1);

    if (!transaction) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 },
      );
    }

    // Check with Midtrans API
    const midtransApiUrl = MIDTRANS_IS_PRODUCTION
      ? `https://api.midtrans.com/v2/${orderId}/status`
      : `https://api.sandbox.midtrans.com/v2/${orderId}/status`;

    const authString = Buffer.from(MIDTRANS_SERVER_KEY + ":").toString(
      "base64",
    );

    const midtransResponse = await fetch(midtransApiUrl, {
      method: "GET",
      headers: {
        Authorization: `Basic ${authString}`,
        Accept: "application/json",
      },
    });

    if (!midtransResponse.ok) {
      console.error("Midtrans API error:", await midtransResponse.text());
      return NextResponse.json(
        { error: "Failed to check payment status" },
        { status: 500 },
      );
    }

    const paymentStatus = await midtransResponse.json();

    // Determine status
    let transactionStatus = "pending";
    let subscriptionStatus = "inactive";

    if (paymentStatus.transaction_status === "capture") {
      if (paymentStatus.fraud_status === "accept") {
        transactionStatus = "success";
        subscriptionStatus = "active";
      }
    } else if (paymentStatus.transaction_status === "settlement") {
      transactionStatus = "success";
      subscriptionStatus = "active";
    } else if (
      paymentStatus.transaction_status === "cancel" ||
      paymentStatus.transaction_status === "deny" ||
      paymentStatus.transaction_status === "expire"
    ) {
      transactionStatus = "failed";
      subscriptionStatus = "inactive";
    }

    // Update transaction
    await db
      .update(paymentTransaction)
      .set({
        status: transactionStatus,
        midtransTransactionId: paymentStatus.transaction_id,
        paymentType: paymentStatus.payment_type,
        transactionTime: paymentStatus.transaction_time
          ? new Date(paymentStatus.transaction_time)
          : null,
        settlementTime: paymentStatus.settlement_time
          ? new Date(paymentStatus.settlement_time)
          : null,
        metadata: JSON.stringify(paymentStatus),
      })
      .where(eq(paymentTransaction.id, transaction.id));

    // Update subscription if successful
    if (subscriptionStatus === "active") {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1);

      await db
        .update(subscription)
        .set({
          status: subscriptionStatus,
          startDate,
          endDate,
        })
        .where(eq(subscription.id, transaction.subscriptionId));
    }

    return NextResponse.json({
      success: true,
      transactionStatus,
      subscriptionStatus,
      paymentStatus,
    });
  } catch (error) {
    console.error("Error checking payment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
