"use server";

import db from "@/lib/db";
import { purses, walletAddresses, links } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export interface PurseData {
  id: number;
  hash: string;
  username: string;
  avatar: string | null;
  bio: string | null;
  walletAddresses: {
    id: number;
    type: string;
    address: string;
    label: string | null;
  }[];
  links: {
    id: number;
    title: string;
    url: string;
  }[];
}

export async function getPurseByUsername(username: string): Promise<{
  success: boolean;
  purse?: PurseData;
  error?: string;
}> {
  try {
    const purse = await db
      .select()
      .from(purses)
      .where(eq(purses.username, username))
      .limit(1);

    if (purse.length === 0) {
      return {
        success: false,
        error: "Purse not found",
      };
    }

    const purseData = purse[0];

    const purseWallets = await db
      .select()
      .from(walletAddresses)
      .where(eq(walletAddresses.purseId, purseData.id));

    const purseLinks = await db
      .select()
      .from(links)
      .where(eq(links.purseId, purseData.id));

    return {
      success: true,
      purse: {
        id: purseData.id,
        hash: purseData.hash,
        username: purseData.username,
        avatar: purseData.avatar,
        bio: purseData.bio,
        walletAddresses: purseWallets,
        links: purseLinks,
      },
    };
  } catch (error) {
    console.error("Error getting purse:", error);
    return {
      success: false,
      error: "Failed to retrieve purse",
    };
  }
}

export async function getAllPurses(): Promise<{
  success: boolean;
  purses?: Array<{
    username: string;
    avatar: string | null;
    bio: string | null;
  }>;
  error?: string;
}> {
  try {
    const allPurses = await db
      .select({
        username: purses.username,
        avatar: purses.avatar,
        bio: purses.bio,
      })
      .from(purses)
      .orderBy(purses.username);

    return {
      success: true,
      purses: allPurses,
    };
  } catch (error) {
    console.error("Error getting all purses:", error);
    return {
      success: false,
      error: "Failed to retrieve purses",
    };
  }
}
