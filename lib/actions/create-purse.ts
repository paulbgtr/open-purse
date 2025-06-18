"use server";

import db from "@/lib/db";
import { purses, walletAddresses, links } from "@/lib/db/schema";
import { generatePurseId } from "@/lib/utils";

export interface CreatePurseData {
  username: string;
  avatar?: string;
  bio?: string;
  walletAddresses: {
    type: string;
    address: string;
    label?: string;
  }[];
  links?: {
    title: string;
    url: string;
  }[];
}

export async function createPurse(data: CreatePurseData) {
  try {
    const hash = await generatePurseId(data.username);

    const [insertedPurse] = await db
      .insert(purses)
      .values({
        hash,
        username: data.username,
        avatar: data.avatar || null,
        bio: data.bio || null,
      })
      .returning({ id: purses.id, hash: purses.hash });

    const { id } = insertedPurse;

    if (data.walletAddresses && data.walletAddresses.length > 0) {
      await db.insert(walletAddresses).values(
        data.walletAddresses.map((wallet) => ({
          purseId: id,
          type: wallet.type,
          address: wallet.address,
          label: wallet.label || null,
        })),
      );
    }

    if (data.links && data.links.length > 0) {
      await db.insert(links).values(
        data.links.map((link) => ({
          purseId: id,
          title: link.title,
          url: link.url,
        })),
      );
    }

    return {
      success: true,
      purseId: hash,
      message: "Purse created successfully",
    };
  } catch (error) {
    console.error("Error creating purse:", error);

    return {
      success: false,
      error: "Failed to create purse. Please try again.",
    };
  }
}
