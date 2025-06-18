"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Copy } from "lucide-react";
import { toast } from "sonner";
import { PurseData } from "@/lib/actions/get-purse";

export const ViewPurse = ({ purse }: { purse: PurseData }) => {
  const { avatar, username, walletAddresses, links, hash, bio } = purse;

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="mb-8">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center space-y-4">
            {avatar ? (
              <div className="relative">
                <Image
                  src={avatar}
                  alt={`${username}'s avatar`}
                  width={120}
                  height={120}
                  className="rounded-full border-4 border-white shadow-lg"
                />
              </div>
            ) : (
              <div className="w-30 h-30 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-3xl font-bold">
                  {username.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <CardTitle className="text-3xl font-bold">@{username}</CardTitle>
              {bio && (
                <CardDescription className="text-lg mt-2 max-w-md mx-auto">
                  {bio}
                </CardDescription>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Wallet Addresses */}
        {walletAddresses.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>💰</span>
                Wallet Addresses
              </CardTitle>
              <CardDescription>
                Copy any address to send crypto directly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {walletAddresses.map((wallet) => (
                <div key={wallet.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{wallet.type}</Badge>
                    {wallet.label && (
                      <span className="text-sm text-muted-foreground">
                        {wallet.label}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <code className="flex-1 text-sm font-mono truncate">
                      {wallet.address}
                    </code>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() =>
                        copyToClipboard(
                          wallet.address,
                          `${wallet.type} address`,
                        )
                      }
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Links */}
        {links && links.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>🔗</span>
                Links
              </CardTitle>
              <CardDescription>Connect with me elsewhere</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted transition-colors">
                    <span className="font-medium">{link.title}</span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <Separator className="mb-6" />
        <p className="text-sm text-muted-foreground">
          <code className="bg-muted px-2 py-1 rounded">{hash}</code>
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Powered by OpenPurse
        </p>
      </div>
    </div>
  );
};
