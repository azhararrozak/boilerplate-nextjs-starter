import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { subscription, paymentTransaction } from "@/db/schema";
import { eq } from "drizzle-orm";
import crypto from "crypto";

const MIDTRANS_SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || "";

// Verify Midtrans signature
function verifySignature(
  orderId: string,
  statusCode: string,
  grossAmount: string,
  signatureKey: string,
): boolean {
  const hash = crypto
    .createHash("sha512")
    .update(`${orderId}${statusCode}${grossAmount}${MIDTRANS_SERVER_KEY}`)
    .digest("hex");
  return hash === signatureKey;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      order_id,
      transaction_status,
      fraud_status,
      status_code,
      gross_amount,
      signature_key,
      transaction_id,
      payment_type,
      transaction_time,
      settlement_time,
    } = body;

    // Verify signature
    const isValidSignature = verifySignature(
      order_id,
      status_code,
      gross_amount,
      signature_key,
    );

    if (!isValidSignature) {
      console.error("Invalid signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Get transaction
    const [transaction] = await db
      .select()
      .from(paymentTransaction)
      .where(eq(paymentTransaction.midtransOrderId, order_id))
      .limit(1);

    if (!transaction) {
      console.error("Transaction not found:", order_id);
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 },
      );
    }

    let transactionStatus = "pending";
    let subscriptionStatus = "inactive";

    // Handle different transaction statuses
    if (transaction_status === "capture") {
      if (fraud_status === "accept") {
        transactionStatus = "success";
        subscriptionStatus = "active";
      }
    } else if (transaction_status === "settlement") {
      transactionStatus = "success";
      subscriptionStatus = "active";
    } else if (
      transaction_status === "cancel" ||
      transaction_status === "deny" ||
      transaction_status === "expire"
    ) {
      transactionStatus = "failed";
      subscriptionStatus = "inactive";
    } else if (transaction_status === "pending") {
      transactionStatus = "pending";
      subscriptionStatus = "inactive";
    }

    // Update payment transaction
    await db
      .update(paymentTransaction)
      .set({
        status: transactionStatus,
        midtransTransactionId: transaction_id,
        paymentType: payment_type,
        transactionTime: transaction_time ? new Date(transaction_time) : null,
        settlementTime: settlement_time ? new Date(settlement_time) : null,
        metadata: JSON.stringify(body),
      })
      .where(eq(paymentTransaction.id, transaction.id));

    // Update subscription if payment is successful
    if (subscriptionStatus === "active") {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 1); // Add 1 month

      await db
        .update(subscription)
        .set({
          status: subscriptionStatus,
          startDate,
          endDate,
        })
        .where(eq(subscription.id, transaction.subscriptionId));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
