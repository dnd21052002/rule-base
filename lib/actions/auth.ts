"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { signUpSchema, type SignUpInput } from "@/lib/validators/auth";
import { signIn } from "@/lib/auth";

export async function registerUser(input: SignUpInput) {
  const parsed = signUpSchema.safeParse(input);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { name, email, password } = parsed.data;

  const existing = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  if (existing) {
    return { error: { email: ["An account with this email already exists"] } };
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db.insert(users).values({
    name,
    email,
    passwordHash,
  });

  await signIn("credentials", {
    email,
    password,
    redirectTo: "/",
  });
}
