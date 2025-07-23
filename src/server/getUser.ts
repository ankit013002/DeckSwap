import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";
import { users } from "./db/schema";
import { eq } from "drizzle-orm";

export async function GetUser() {
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return;
  }

  const user = await db
    .selectDistinct()
    .from(users)
    .where(eq(users.clerkUserId, clerkUser.id));

  const currUser = user[0];

  return currUser;
}
