import {
  int,
  bigint,
  text,
  decimal,
  varchar,
  timestamp,
  singlestoreTable,
  longtext,
} from "drizzle-orm/singlestore-core";
import { relations, type InferModel } from "drizzle-orm";

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
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  willingToTrade: varchar("willing_to_trade", { length: 3 })
    .notNull()
    .default("No"),
  tradingFor: varchar("trading_for", { length: 255 }),
  description: text("description"),
  category: varchar("category", { length: 30 }).notNull(),
  condition: varchar("condition", { length: 30 }),
  usedConditionDescription: text("used_condition_description"),
  mintCompany: varchar("mint_company", { length: 10 }),
  mintGrade: varchar("mint_grade", { length: 20 }),
  imageUrl: longtext("image_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const cart = singlestoreTable("carts_table", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  userId: bigint("user_id", { mode: "bigint" }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const cartItems = singlestoreTable("cart_items_table", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  cartId: bigint("cart_id", { mode: "bigint" }).notNull(),
  itemId: bigint("item_id", { mode: "bigint" }).notNull(),
  quantity: int("quantity").notNull().default(1),
  addedAt: timestamp("added_at").defaultNow().notNull(),
});

export const cartRelations = relations(cart, ({ one, many }) => ({
  user: one(users, {
    fields: [cart.userId],
    references: [users.id],
  }),
  cartItems: many(cartItems),
}));

export const cartItemsRelations = relations(cartItems, ({ one }) => ({
  cart: one(cart, {
    fields: [cartItems.cartId],
    references: [cart.id],
  }),
  item: one(items, {
    fields: [cartItems.itemId],
    references: [items.id],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  items: many(items),
}));
export const itemsRelations = relations(items, ({ one }) => ({
  user: one(users, {
    fields: [items.userId],
    references: [users.id],
  }),
}));

export type UserType = InferModel<typeof users>;
export type NewUser = InferModel<typeof users, "insert">;
export type ItemType = InferModel<typeof items>;
export type NewItem = InferModel<typeof items, "insert">;
export type Cart = InferModel<typeof cart>;
export type NewCart = InferModel<typeof cart, "insert">;
export type CartItem = InferModel<typeof cartItems>;
export type NewCartItem = InferModel<typeof cartItems, "insert">;
