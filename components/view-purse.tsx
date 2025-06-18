"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
import {
  ExternalLink,
  Copy,
  QrCode,
  Share2,
  Download,
  Eye,
  EyeOff,
} from "lucide-react";
import { toast } from "sonner";
import { PurseData } from "@/lib/actions/get-purse";
import QRCodeReact from "react-qr-code";
import { calculateAura } from "@/lib/utils/aura-calculator";

export const ViewPurse = ({ purse }: { purse: PurseData }) => {
  const { avatar, username, walletAddresses, links, hash, bio } = purse;
  const [showQR, setShowQR] = useState(false);
  const [showFullAddresses, setShowFullAddresses] = useState<
    Record<number, boolean>
  >({});

  const profileUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/${username}`
      : `/${username}`;

  const aura = calculateAura(purse);

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = document.createElement("img");

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.download = `${username}-qr.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };

      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  const toggleAddressView = (walletId: number) => {
    setShowFullAddresses((prev) => ({
      ...prev,
      [walletId]: !prev[walletId],
    }));
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="max-w-6xl mx-auto relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,0,77,0.05)_2px,transparent_0)] bg-[length:20px_20px] pointer-events-none"></div>

      {/* Main Profile Card */}
      <Card className="mb-8 border-2 border-primary/20 shadow-[6px_6px_0px_0px_theme(colors.primary/20)] bg-gradient-to-br from-card to-card/80 relative z-10">
        <CardHeader className="text-center pb-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Avatar with 8-bit styling */}
            <div className="relative">
              {avatar ? (
                <div className="relative">
                  <Image
                    src={avatar}
                    alt={`${username}'s avatar`}
                    width={120}
                    height={120}
                    className="rounded-none border-4 border-primary shadow-[4px_4px_0px_0px_theme(colors.primary)]"
                    style={{ imageRendering: "pixelated" }}
                  />
                  {/* Pixelated border effect */}
                  <div className="absolute -inset-2 border-2 border-secondary/30 rounded-none -z-10"></div>
                </div>
              ) : (
                <div className="relative">
                  <div className="w-30 h-30 bg-gradient-to-br from-secondary to-accent rounded-none border-4 border-primary shadow-[4px_4px_0px_0px_theme(colors.primary)] flex items-center justify-center">
                    <span className="text-primary-foreground text-4xl font-pixel">
                      {username.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -inset-2 border-2 border-secondary/30 rounded-none -z-10"></div>
                </div>
              )}

              {/* Dynamic aura indicator */}
              <div
                className={`absolute -bottom-2 -right-2 bg-gradient-to-br ${aura.color} border-2 border-background rounded-none px-2 py-1 shadow-[2px_2px_0px_0px_theme(colors.background)] group cursor-help`}
                title={aura.description}
              >
                <span className="text-xs font-pixel text-background flex items-center gap-1">
                  <span className="text-[10px]">{aura.emoji}</span>
                  {aura.name}
                </span>
              </div>
            </div>

            {/* Username and Bio */}
            <div className="space-y-4">
              <CardTitle className="text-4xl font-pixel text-foreground relative">
                @{username}
                <div className="absolute -inset-1 border border-primary/20 rounded-none -z-10"></div>
              </CardTitle>
              {bio && (
                <CardDescription className="text-lg font-pixel-sm max-w-2xl mx-auto leading-relaxed">
                  {bio}
                </CardDescription>
              )}
            </div>

            {/* QR Code and Share Section */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <Button
                variant="secondary"
                onClick={() => setShowQR(!showQR)}
                className="font-pixel-sm gap-2 shadow-[3px_3px_0px_0px_theme(colors.secondary)] hover:shadow-[4px_4px_0px_0px_theme(colors.secondary)] hover:translate-x-[-1px] hover:translate-y-[-1px]"
              >
                <QrCode className="h-4 w-4" />
                {showQR ? "Hide QR" : "Show QR"}
              </Button>

              <Button
                variant="outline"
                onClick={() => copyToClipboard(profileUrl, "Profile URL")}
                className="font-pixel-sm gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share Profile
              </Button>
            </div>

            {/* QR Code Display */}
            {showQR && (
              <Card className="border-2 border-ring/20 shadow-[4px_4px_0px_0px_theme(colors.ring/20)] bg-white p-6">
                <div className="text-center space-y-4">
                  <div className="bg-white p-4 rounded-none border-2 border-primary">
                    <QRCodeReact
                      id="qr-code"
                      value={profileUrl}
                      size={200}
                      level="M"
                    />
                  </div>
                  <p className="text-sm font-pixel-sm text-muted-foreground">
                    Scan to visit @{username}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={downloadQRCode}
                    className="font-pixel-sm gap-2"
                  >
                    <Download className="h-3 w-3" />
                    Download QR
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </CardHeader>
      </Card>

      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Wallet Addresses */}
        {walletAddresses.length > 0 && (
          <Card className="w-full border-2 border-secondary/20 shadow-[6px_6px_0px_0px_theme(colors.secondary/20)] hover:shadow-[8px_8px_0px_0px_theme(colors.secondary/30)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 bg-gradient-to-br from-card to-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-pixel-sm text-secondary">
                <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-none flex items-center justify-center shadow-[2px_2px_0px_0px_theme(colors.background)]">
                  <span className="text-lg">💰</span>
                </div>
                Wallet Addresses
              </CardTitle>
              <CardDescription className="font-pixel-sm text-xs">
                Copy any address to send crypto directly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {walletAddresses.map((wallet) => (
                <div key={wallet.id} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge
                      variant="secondary"
                      className="font-pixel-sm rounded-none border-2 shadow-[2px_2px_0px_0px_theme(colors.secondary)]"
                    >
                      {wallet.type}
                    </Badge>
                    {wallet.label && (
                      <span className="text-xs font-pixel-sm text-muted-foreground">
                        {wallet.label}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 p-4 bg-muted/50 rounded-none border-2 border-muted shadow-[2px_2px_0px_0px_theme(colors.muted)]">
                    <code className="flex-1 text-sm font-mono">
                      {showFullAddresses[wallet.id]
                        ? wallet.address
                        : truncateAddress(wallet.address)}
                    </code>
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleAddressView(wallet.id)}
                        className="h-8 w-8 p-0"
                      >
                        {showFullAddresses[wallet.id] ? (
                          <EyeOff className="h-3 w-3" />
                        ) : (
                          <Eye className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() =>
                          copyToClipboard(
                            wallet.address,
                            `${wallet.type} address`,
                          )
                        }
                        className="h-8 w-8 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Links */}
        {links && links.length > 0 && (
          <Card className="w-full border-2 border-accent/20 shadow-[6px_6px_0px_0px_theme(colors.accent/20)] hover:shadow-[8px_8px_0px_0px_theme(colors.accent/30)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 bg-gradient-to-br from-card to-card/80">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 font-pixel-sm text-accent">
                <div className="w-8 h-8 bg-gradient-to-br from-accent to-primary rounded-none flex items-center justify-center shadow-[2px_2px_0px_0px_theme(colors.background)]">
                  <span className="text-lg">🔗</span>
                </div>
                Links
              </CardTitle>
              <CardDescription className="font-pixel-sm text-xs">
                Connect with me elsewhere
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {links.map((link, index) => (
                <Link
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="flex items-center justify-between p-4 border-2 border-muted rounded-none hover:border-accent hover:bg-accent/10 transition-all duration-200 shadow-[2px_2px_0px_0px_theme(colors.muted)] hover:shadow-[4px_4px_0px_0px_theme(colors.accent)] hover:translate-x-[-2px] hover:translate-y-[-2px]">
                    <span className="font-pixel-sm font-medium group-hover:text-accent transition-colors">
                      {link.title}
                    </span>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Empty State */}
      {walletAddresses.length === 0 && (!links || links.length === 0) && (
        <Card className="text-center py-16 border-2 border-dashed border-muted-foreground/20 bg-muted/10">
          <CardContent>
            <div className="space-y-4">
              <div className="text-6xl">🎮</div>
              <p className="text-lg font-pixel-sm text-muted-foreground">
                This purse is empty
              </p>
              <p className="text-sm font-pixel-sm text-muted-foreground/70">
                No wallet addresses or links have been added yet
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Footer */}
      <div className="mt-16 text-center space-y-6">
        <Separator className="opacity-50" />
        <div className="space-y-2">
          <p className="text-sm font-pixel-sm text-muted-foreground">
            Purse ID:{" "}
            <code className="bg-muted/50 px-3 py-1 rounded-none border border-muted font-mono">
              {hash}
            </code>
          </p>
          <p className="text-xs font-pixel-sm text-muted-foreground/70">
            Powered by OpenPurse ⚡ No platform BS
          </p>
        </div>
      </div>
    </div>
  );
};
