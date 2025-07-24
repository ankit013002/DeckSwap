import { db } from "./db";
import { cartItems } from "./db/schema";
import { GetCart } from "./getCart";

export async function PostCartItem(itemId: string) {
  const userCartId = await GetCart();
  if (!userCartId) {
    return;
  }

  const response = await db.insert(cartItems).values({
    cartId: userCartId,
    itemId: BigInt(itemId),
    quantity: 1,
  });

  return response;
}
