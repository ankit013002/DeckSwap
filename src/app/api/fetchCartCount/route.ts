import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { URLSearchParams } from "url";
import { db } from "~/server/db";
import { cart, cartItems } from "~/server/db/schema";
import { GetUser } from "~/server/getUser";

export type FetchCartCount = {
  success: boolean;
  message: string;
  count?: number;
};

export async function GET() {
  const user = await GetUser();

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "Cannot find user",
      count: null,
    });
  }

  const userCarts = await db
    .select()
    .from(cart)
    .where(eq(cart.userId, user.id));
  const userCart = userCarts[0];
  if (!userCart) {
    return NextResponse.json({
      success: true,
      message: "Cart doesn't exist",
      count: 0,
    });
  }
  const userCartItems = await db
    .select()
    .from(cartItems)
    .where(eq(cartItems.cartId, userCart.id));

  return NextResponse.json({
    sucess: true,
    message: "Cart count returned",
    count: userCartItems.length,
  });
}
