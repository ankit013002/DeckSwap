import { eq } from "drizzle-orm";
import { db } from "./db";
import { cart } from "./db/schema";
import { GetUser } from "./getUser";
import { CreateCartForUser } from "./createCartForUser";

export async function GetCart() {
  const user = await GetUser();

  if (!user) {
    return null;
  }

  const userCart = await db
    .selectDistinct()
    .from(cart)
    .where(eq(cart.userId, user.id));

  if (!userCart[0]) {
    const entry = await CreateCartForUser(user);
    if (entry) {
      return entry[0]?.id;
    } else {
      return null;
    }
  } else {
    const id = userCart[0]?.id;
    return id;
  }
}
