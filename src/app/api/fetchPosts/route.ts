import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { items, users } from "~/server/db/schema";

export async function GET() {
  try {
    const rawData = await db
      .select({
        id: items.id,
        userId: items.userId,
        title: items.title,
        price: items.price,
        description: items.description,
        category: items.category,
        condition: items.condition,
        imageUrl: items.imageUrl,
        soldBy: users.name,
      })
      .from(items)
      .leftJoin(users, eq(items.userId, users.id));
    console.log(rawData);

    const data = await Promise.all(
      rawData.map(async (row) => {
        return {
          ...row,
          id: row.id.toString(),
          soldby: row.soldBy,
          userId: row.userId.toString(),
          title: row.title.toString(),
          price: row.price.toString(),
          description: row.description?.toString(),
          category: row.category.toString(),
          condition: row.condition?.toString(),
          imageUrl: row.imageUrl?.toString(),
        };
      }),
    );

    return NextResponse.json(data);
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json(
        { success: false, error: err.message },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          error: "Unknown Server Error",
        },
        { status: 500 },
      );
    }
  }
}
