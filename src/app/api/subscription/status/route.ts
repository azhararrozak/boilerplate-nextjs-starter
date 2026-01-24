import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { subscription, subscriptionPlan } from "@/db/schema";
import { eq, desc } from "drizzle-orm";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user's active subscription
    const userSubscriptions = await db
      .select({
        subscription: subscription,
        plan: subscriptionPlan,
      })
      .from(subscription)
      .innerJoin(subscriptionPlan, eq(subscription.planId, subscriptionPlan.id))
      .where(eq(subscription.userId, session.user.id))
      .orderBy(desc(subscription.createdAt))
      .limit(1);

    if (userSubscriptions.length === 0) {
      return NextResponse.json({
        hasSubscription: false,
        subscription: null,
        plan: null,
      });
    }

    const currentSubscription = userSubscriptions[0];

    // Check if expired
    const isExpired =
      currentSubscription.subscription.endDate &&
      new Date(currentSubscription.subscription.endDate) < new Date();

    return NextResponse.json({
      hasSubscription: true,
      subscription: {
        ...currentSubscription.subscription,
        isExpired,
        isActive:
          currentSubscription.subscription.status === "active" && !isExpired,
      },
      plan: currentSubscription.plan,
    });
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
