import {
  int,
  bigint,
  text,
  varchar,
  timestamp,
  singlestoreTable,
  longtext,
} from "drizzle-orm/singlestore-core";
import { relations } from "drizzle-orm";

export const users = singlestoreTable("users_table", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  clerkUserId: varchar("clerk_user_id", { length: 255 }).notNull(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 150 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const items = singlestoreTable("items_table", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  userId: bigint("user_id", { mode: "bigint" }).notNull(),
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 30 }).notNull(),
  condition: varchar("condition", { length: 30 }),
  imageUrl: longtext("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  items: many(items),
}));
export const itemsRelations = relations(items, ({ one }) => ({
  user: one(users, {
    fields: [items.userId],
    references: [users.id],
  }),
}));
