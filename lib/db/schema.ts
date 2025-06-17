import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const purses = sqliteTable("purses", {
  id: int("id").primaryKey(),
  purseId: text("purse_id").notNull().unique(),
  username: text("username").notNull().unique(),
  bio: text("bio"),
});

export const walletAddresses = sqliteTable("wallet_addresses", {
  id: int("id").primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => purses.id),
  address: text("address").notNull().unique(),
});

export const links = sqliteTable("links", {
  id: int("id").primaryKey(),
  userId: int("user_id")
    .notNull()
    .references(() => purses.id),
  link: text("link").notNull().unique(),
});

export type User = typeof purses.$inferSelect;
export type WalletAddress = typeof walletAddresses.$inferSelect;
export type Link = typeof links.$inferSelect;
