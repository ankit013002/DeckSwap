import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "~/server/db/";
import { users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/singlestore";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const clerkUser = await currentUser();

  const firstName = clerkUser?.firstName ?? "";
  const lastName = clerkUser?.lastName ?? "";
  const name = [firstName, lastName].filter(Boolean).join(" ");
  const email = clerkUser?.primaryEmailAddress?.emailAddress;

  if (!email) {
    return NextResponse.json({ error: "No verified email" }, { status: 400 });
  }

  const potentialUser = await db
    .selectDistinct()
    .from(users)
    .where(eq(users.clerkUserId, userId));

  if (potentialUser.length > 0) {
    console.log("FOUND, Potential User:", potentialUser);
    return NextResponse.json({ success: true });
  }

  console.log(`clerkID: ${userId} and name: ${name} and email: ${email}`);

  await db
    .insert(users)
    .values({
      clerkUserId: userId,
      name,
      email,
    })
    .onDuplicateKeyUpdate({
      set: { name, email },
    });

  return NextResponse.json({ success: true });
}
