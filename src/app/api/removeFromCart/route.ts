import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { cartItems } from "~/server/db/schema";

export async function POST(request: Request) {
  const { cartItemId } = (await request.json()) as { cartItemId: string };

  if (!cartItemId) {
    return NextResponse.json({
      success: false,
      message: "Cart Item Id Error",
      response: null,
    });
  }

  const response = await db
    .delete(cartItems)
    .where(eq(cartItems.id, BigInt(cartItemId)));

  return NextResponse.json({
    success: true,
    message: "Item successfully removed from cart",
    response: response,
  });
}
