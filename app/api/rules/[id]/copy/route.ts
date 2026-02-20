import { NextRequest, NextResponse } from "next/server";
import { eq, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { copies, rules } from "@/lib/db/schema";
import { auth } from "@/lib/auth";

// POST /api/rules/:id/copy — track a copy event
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const existing = await db.query.rules.findFirst({
      where: eq(rules.id, id),
      columns: { id: true },
    });

    if (!existing) {
      return NextResponse.json({ error: "Rule not found" }, { status: 404 });
    }

    const session = await auth();

    await db.insert(copies).values({
      ruleId: id,
      userId: session?.user?.id ?? null,
    });

    await db
      .update(rules)
      .set({ copyCount: sql`${rules.copyCount} + 1` })
      .where(eq(rules.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/rules/[id]/copy error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
