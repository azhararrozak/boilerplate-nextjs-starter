import "dotenv/config";
import { db } from "../index";
import { subscriptionPlan } from "../schema";

async function seedPlans() {
  try {
    console.log("🌱 Seeding subscription plans...");

    const plans = [
      {
        id: "free",
        name: "Free",
        price: "0",
        interval: "monthly",
        features: JSON.stringify([
          "Akses dasar ke dashboard",
          "5 proyek per bulan",
          "Penyimpanan 1GB",
          "Email support",
          "Akses komunitas",
        ]),
        isActive: true,
      },
      {
        id: "premium",
        name: "Premium",
        price: "50000",
        interval: "monthly",
        features: JSON.stringify([
          "Akses penuh ke semua fitur",
          "Unlimited proyek",
          "Penyimpanan 100GB",
          "Priority support 24/7",
          "Advanced analytics",
          "API access",
          "Custom branding",
          "Team collaboration",
        ]),
        isActive: true,
      },
    ];

    for (const plan of plans) {
      await db
        .insert(subscriptionPlan)
        .values(plan)
        .onConflictDoUpdate({
          target: subscriptionPlan.id,
          set: {
            name: plan.name,
            price: plan.price,
            interval: plan.interval,
            features: plan.features,
            isActive: plan.isActive,
          },
        });
      console.log(`✓ Seeded plan: ${plan.name}`);
    }

    console.log("✅ Subscription plans seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding plans:", error);
    process.exit(1);
  }
}

seedPlans();
