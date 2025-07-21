import { eq } from "drizzle-orm";
import { db } from "./db";
import { items, type ItemType } from "./db/schema";

export async function GetProduct(itemId: bigint) {
  const item: ItemType[] = await db
    .select()
    .from(items)
    .where(eq(items.id, itemId));
  if (!item[0]) {
    return null;
  }
  return item[0];
}
