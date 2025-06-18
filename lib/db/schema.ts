import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const purses = sqliteTable("purses", {
  id: int("id").primaryKey(),
  hash: text("purse_id").notNull().unique(),
  username: text("username").notNull().unique(),
  avatar: text("avatar"),
  bio: text("bio"),
});

export const walletAddresses = sqliteTable("wallet_addresses", {
  id: int("id").primaryKey(),
  purseId: int("purse_id")
    .notNull()
    .references(() => purses.id),
  type: text("type").notNull(),
  address: text("address").notNull(),
  label: text("label"),
});

export const links = sqliteTable("links", {
  id: int("id").primaryKey(),
  purseId: int("purse_id")
    .notNull()
    .references(() => purses.id),
  title: text("title").notNull(),
  url: text("url").notNull(),
});

export type InsertUser = typeof purses.$inferInsert;
export type InsertWalletAddress = typeof walletAddresses.$inferInsert;
export type InsertLink = typeof links.$inferInsert;
