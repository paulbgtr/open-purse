import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generatePurseId = async (
  username: string | undefined = "anonymous",
) => {
  try {
    const timestamp = Date.now().toString();
    const randomBytes = window.crypto.getRandomValues(new Uint8Array(16));
    const randomString = Array.from(randomBytes, (byte) =>
      byte.toString(36),
    ).join("");

    // Create a hash from username + timestamp + random data
    const data = `${username}-${timestamp}-${randomString}`;
    const encoder = new TextEncoder();
    const hashBuffer = await window.crypto.subtle.digest(
      "SHA-256",
      encoder.encode(data),
    );
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    // Take first 20 characters and format as base58-like
    const chars = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < 20; i++) {
      const index = parseInt(hashHex.substr(i * 2, 2), 16) % chars.length;
      result += chars[index];
    }

    const formattedId = `purse:${result}`;
    return formattedId;
  } catch (error) {
    console.error("ID generation error:", error);
    throw error;
  }
};
