import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { rules, users, categories } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { updateRuleSchema } from "@/lib/validators/rules";

// GET /api/rules/:id — get a single rule with full content
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [rule] = await db
      .select({
        id: rules.id,
        title: rules.title,
        slug: rules.slug,
        description: rules.description,
        content: rules.content,
        tags: rules.tags,
        copyCount: rules.copyCount,
        avgRating: rules.avgRating,
        ratingCount: rules.ratingCount,
        isFeatured: rules.isFeatured,
        isPublic: rules.isPublic,
        createdAt: rules.createdAt,
        updatedAt: rules.updatedAt,
        author: {
          id: users.id,
          name: users.name,
          image: users.image,
        },
        category: {
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
        },
      })
      .from(rules)
      .innerJoin(users, eq(rules.authorId, users.id))
      .innerJoin(categories, eq(rules.categoryId, categories.id))
      .where(eq(rules.id, id))
      .limit(1);

    if (!rule) {
      return NextResponse.json({ error: "Rule not found" }, { status: 404 });
    }

    return NextResponse.json({ data: rule });
  } catch (error) {
    console.error("GET /api/rules/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PATCH /api/rules/:id — update a rule (owner only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await db.query.rules.findFirst({
      where: eq(rules.id, id),
    });

    if (!existing) {
      return NextResponse.json({ error: "Rule not found" }, { status: 404 });
    }

    if (existing.authorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = updateRuleSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const [updated] = await db
      .update(rules)
      .set(parsed.data)
      .where(eq(rules.id, id))
      .returning();

    return NextResponse.json({ data: updated });
  } catch (error) {
    console.error("PATCH /api/rules/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/rules/:id — delete a rule (owner only)
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    const existing = await db.query.rules.findFirst({
      where: eq(rules.id, id),
    });

    if (!existing) {
      return NextResponse.json({ error: "Rule not found" }, { status: 404 });
    }

    if (existing.authorId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    await db.delete(rules).where(eq(rules.id, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/rules/[id] error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
