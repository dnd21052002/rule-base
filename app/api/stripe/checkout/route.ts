import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { createCheckoutSession } from "@/lib/stripe/helpers";

export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const checkoutSession = await createCheckoutSession(session.user.id);
    return NextResponse.json({ url: checkoutSession.url });
  } catch {
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 },
    );
  }
}
