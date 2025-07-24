import { db } from "./db";
import { cart, type UserType } from "./db/schema";

export async function CreateCartForUser(user: UserType) {
  const newCartId = db
    .insert(cart)
    .values({
      userId: user.id,
    })
    .$returningId();

  return newCartId;
}
