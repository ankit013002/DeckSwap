import { eq } from "drizzle-orm";
import { db } from "./db";
import { cart } from "./db/schema";
import { GetUser } from "./getUser";

export async function GetCart() {
  const user = await GetUser();

  if (!user) {
    return;
  }

  const userCart = await db
    .selectDistinct()
    .from(cart)
    .where(eq(cart.userId, user.id));

  return userCart;
}
