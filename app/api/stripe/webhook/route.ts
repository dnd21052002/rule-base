import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import type Stripe from "stripe";

import { stripe as getStripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { subscriptions, users } from "@/lib/db/schema";

function getSubPeriod(sub: Stripe.Subscription) {
  const item = sub.items.data[0];
  return {
    start: new Date(item.current_period_start * 1000),
    end: new Date(item.current_period_end * 1000),
  };
}

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 },
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.mode === "subscription" && session.subscription) {
        const sub = await getStripe().subscriptions.retrieve(
          session.subscription as string,
        );
        const userId = session.metadata?.userId;
        if (!userId) break;

        const period = getSubPeriod(sub);

        await db.insert(subscriptions).values({
          userId,
          stripeSubscriptionId: sub.id,
          stripePriceId: sub.items.data[0].price.id,
          status: "active",
          currentPeriodStart: period.start,
          currentPeriodEnd: period.end,
          cancelAtPeriodEnd: sub.cancel_at_period_end,
        });

        await db
          .update(users)
          .set({ plan: "pro" })
          .where(eq(users.id, userId));
      }
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const existing = await db.query.subscriptions.findFirst({
        where: eq(subscriptions.stripeSubscriptionId, sub.id),
      });
      if (!existing) break;

      const status = sub.status as typeof existing.status;
      const period = getSubPeriod(sub);

      await db
        .update(subscriptions)
        .set({
          status,
          stripePriceId: sub.items.data[0].price.id,
          currentPeriodStart: period.start,
          currentPeriodEnd: period.end,
          cancelAtPeriodEnd: sub.cancel_at_period_end,
        })
        .where(eq(subscriptions.stripeSubscriptionId, sub.id));

      const plan =
        status === "active" || status === "trialing" ? "pro" : "free";
      await db
        .update(users)
        .set({ plan })
        .where(eq(users.id, existing.userId));
      break;
    }

    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const existing = await db.query.subscriptions.findFirst({
        where: eq(subscriptions.stripeSubscriptionId, sub.id),
      });
      if (!existing) break;

      await db
        .update(subscriptions)
        .set({ status: "canceled" })
        .where(eq(subscriptions.stripeSubscriptionId, sub.id));

      await db
        .update(users)
        .set({ plan: "free" })
        .where(eq(users.id, existing.userId));
      break;
    }
  }

  return NextResponse.json({ received: true });
}
