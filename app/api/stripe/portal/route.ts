import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { createBillingPortalSession } from "@/lib/stripe/helpers";

export async function POST() {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const portalSession = await createBillingPortalSession(session.user.id);
    return NextResponse.json({ url: portalSession.url });
  } catch {
    return NextResponse.json(
      { error: "Failed to create portal session" },
      { status: 500 },
    );
  }
}
