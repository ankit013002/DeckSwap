import { eq, like, ne, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { items, users } from "~/server/db/schema";
import { GetUser } from "~/server/getUser";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query")?.toLowerCase() ?? "";
  const itemType = searchParams.get("itemType")?.toLocaleLowerCase() ?? "";
  const currUser = await GetUser();

  if (!currUser) {
    console.log("HERE");
    let rawData = null;
    rawData = await db
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
  }

  if (query || itemType) {
    try {
      let rawData = null;
      if (query) {
        rawData = await db
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
          .leftJoin(users, eq(items.userId, users.id))
          .where(
            sql`${items.title} LIKE ${`%${query}%`} AND ${items.userId} <> ${currUser.id}`,
          );
      } else {
        rawData = await db
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
          .leftJoin(users, eq(items.userId, users.id))
          .where(
            sql`${items.category} LIKE ${`%${itemType}%`} AND ${items.userId} <> ${currUser.id}`,
          );
      }

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
  } else {
    try {
      let rawData = null;
      rawData = await db
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
        .leftJoin(users, eq(items.userId, users.id))
        .where(ne(items.userId, currUser?.id));

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
}
