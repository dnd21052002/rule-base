import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as { email?: string };
    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
      columns: { emailVerified: true },
    });

    if (!user) {
      return NextResponse.json({ exists: false });
    }

    return NextResponse.json({
      exists: true,
      verified: !!user.emailVerified,
    });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
