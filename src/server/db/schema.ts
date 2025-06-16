import {
  int,
  bigint,
  text,
  varchar,
  timestamp,
  singlestoreTable,
} from "drizzle-orm/singlestore-core";
import { relations } from "drizzle-orm";

export const users = singlestoreTable("users_table", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  name: varchar("name", { length: 100 }), // shorter names
  email: varchar("email", { length: 150 }).notNull(), // no .unique()
  passwordHash: varchar("password_hash", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const items = singlestoreTable("items_table", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  userId: bigint("user_id", { mode: "bigint" }).notNull(), // FK to users
  title: varchar("title", { length: 100 }).notNull(),
  description: text("description"),
  category: varchar("category", { length: 30 }).notNull(),
  condition: varchar("condition", { length: 30 }),
  imageUrl: varchar("image_url", { length: 255 }),
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
