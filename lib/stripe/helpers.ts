import { eq } from "drizzle-orm";

import { stripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

export async function getOrCreateStripeCustomer(userId: string) {
  const user = await db.query.users.findFirst({
    where: eq(users.id, userId),
  });

  if (!user) throw new Error("User not found");

  if (user.stripeCustomerId) {
    return user.stripeCustomerId;
  }

  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name ?? undefined,
    metadata: { userId: user.id },
  });

  await db
    .update(users)
    .set({ stripeCustomerId: customer.id })
    .where(eq(users.id, userId));

  return customer.id;
}

export async function createCheckoutSession(userId: string) {
  const customerId = await getOrCreateStripeCustomer(userId);

  return stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRO_PRICE_ID!,
        quantity: 1,
      },
    ],
    success_url: `${process.env.AUTH_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.AUTH_URL}/pricing`,
    metadata: { userId },
  });
}

export async function createBillingPortalSession(userId: string) {
  const customerId = await getOrCreateStripeCustomer(userId);

  return stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.AUTH_URL}/dashboard`,
  });
}
