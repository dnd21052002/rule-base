import { NextRequest, NextResponse } from "next/server";
import { and, desc, eq, ilike, or, sql } from "drizzle-orm";

import { db } from "@/lib/db";
import { rules, categories, users } from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { createRuleSchema, queryRulesSchema } from "@/lib/validators/rules";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// GET /api/rules — list & search rules
export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams);
    const parsed = queryRulesSchema.safeParse(params);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid query parameters", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { q, category, featured, sort, page, limit } = parsed.data;
    const offset = (page - 1) * limit;

    const conditions = [eq(rules.isPublic, true)];

    if (q) {
      conditions.push(
        or(
          ilike(rules.title, `%${q}%`),
          ilike(rules.description, `%${q}%`)
        )!
      );
    }

    if (category) {
      conditions.push(eq(rules.categoryId, category));
    }

    if (featured) {
      conditions.push(eq(rules.isFeatured, true));
    }

    const orderBy =
      sort === "popular"
        ? desc(rules.copyCount)
        : sort === "top-rated"
          ? desc(rules.avgRating)
          : desc(rules.createdAt);

    const [items, countResult] = await Promise.all([
      db
        .select({
          id: rules.id,
          title: rules.title,
          slug: rules.slug,
          description: rules.description,
          tags: rules.tags,
          copyCount: rules.copyCount,
          avgRating: rules.avgRating,
          ratingCount: rules.ratingCount,
          isFeatured: rules.isFeatured,
          createdAt: rules.createdAt,
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
        .where(and(...conditions))
        .orderBy(orderBy)
        .limit(limit)
        .offset(offset),

      db
        .select({ count: sql<number>`count(*)` })
        .from(rules)
        .where(and(...conditions)),
    ]);

    const total = Number(countResult[0]?.count ?? 0);

    return NextResponse.json({
      data: items,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET /api/rules error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/rules — create a new rule (authenticated)
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = createRuleSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { title, description, content, categoryId, tags, isPublic } =
      parsed.data;

    const slug = `${slugify(title)}-${Date.now().toString(36)}`;

    const [newRule] = await db
      .insert(rules)
      .values({
        title,
        slug,
        description,
        content,
        authorId: session.user.id,
        categoryId,
        tags,
        isPublic,
      })
      .returning();

    return NextResponse.json({ data: newRule }, { status: 201 });
  } catch (error) {
    console.error("POST /api/rules error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
