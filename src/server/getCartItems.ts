import { eq } from "drizzle-orm";
import { db } from "./db";
import { cartItems, items } from "./db/schema";
import { GetCart } from "./getCart";

export async function GetCartItems() {
  const userCartId = await GetCart();

  if (!userCartId) {
    return null;
  }

  const userCartItems = await db
    .select()
    .from(cartItems)
    .leftJoin(items, eq(items.id, cartItems.itemId))
    .where(eq(cartItems.cartId, userCartId));

  return userCartItems;
}
