import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { items, users } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import type { Item } from "~/lib/mock-data";

export async function POST(request: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "User does not exist" }, { status: 401 });
  }

  const [currUser] = await db
    .selectDistinct()
    .from(users)
    .where(eq(users.clerkUserId, userId));

  if (!currUser) {
    return NextResponse.json({ error: "User does not exist" }, { status: 401 });
  }

  try {
    const { title, description, category, condition, imageUrl, price } =
      (await request.json()) as {
        title: string;
        price: string;
        description: string;
        category: string;
        condition: string;
        imageUrl: string;
      };

    const result = await db.insert(items).values({
      userId: currUser.id,
      title,
      price,
      description,
      category,
      condition,
      imageUrl,
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API createPosting error:", err);
    if (err instanceof Error) {
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 500 },
      );
    }
    return NextResponse.json(
      { success: false, error: "Unknown server error" },
      { status: 500 },
    );
  }
}
