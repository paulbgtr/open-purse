"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useState } from "react";
import { BiSolidInvader } from "react-icons/bi";
import {
  Wallet,
  Shield,
  Zap,
  Code,
  Users,
  Globe,
  Download,
  QrCode,
  Key,
  ArrowRight,
  Sparkles,
  Dice1,
} from "lucide-react";
import { Press_Start_2P } from "next/font/google";
import { calculateAura, AuraResult } from "@/lib/utils/aura-calculator";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

// Add CSS animations
const animations = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
    40% { transform: translateY(-10px); }
    60% { transform: translateY(-5px); }
  }
  @keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
  }
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
  }
  @keyframes typewriter {
    from { width: 0; }
    to { width: 100%; }
  }
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  @keyframes matrix {
    0% { transform: translateY(-100vh); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(100vh); opacity: 0; }
  }
  @keyframes wiggle {
    0%, 7% { transform: rotateZ(0); }
    15% { transform: rotateZ(-15deg); }
    20% { transform: rotateZ(10deg); }
    25% { transform: rotateZ(-10deg); }
    30% { transform: rotateZ(6deg); }
    35% { transform: rotateZ(-4deg); }
    40%, 100% { transform: rotateZ(0); }
  }
  .float { animation: float 3s ease-in-out infinite; }
  .bounce { animation: bounce 2s infinite; }
  .glitch { animation: glitch 0.3s infinite; }
  .pulse { animation: pulse 2s ease-in-out infinite; }
  .shake { animation: shake 0.5s ease-in-out infinite; }
  .wiggle { animation: wiggle 2s ease-in-out infinite; }
  .matrix { animation: matrix 3s linear infinite; }
`;

export default function Home() {
  const [auraInput, setAuraInput] = useState({
    username: "",
    bio: "",
    wallets: [] as string[],
    links: [] as string[],
  });
  const [calculatedAura, setCalculatedAura] = useState<AuraResult | null>(null);
  const [showAuraResult, setShowAuraResult] = useState(false);

  const handleCalculateAura = () => {
    // Create mock purse data for aura calculation
    const mockPurse = {
      id: 1,
      hash: "mock",
      username: auraInput.username || "anon",
      bio: auraInput.bio,
      avatar: null,
      walletAddresses: auraInput.wallets.map((wallet, i) => ({
        id: i,
        type: wallet,
        address: `mock_address_${i}`,
        label: null,
      })),
      links: auraInput.links.map((link, i) => ({
        id: i,
        title: link,
        url: `https://${link.toLowerCase()}.com`,
      })),
    };

    const aura = calculateAura(mockPurse);
    setCalculatedAura(aura);
    setShowAuraResult(true);
  };

  const addWallet = (type: string) => {
    if (!auraInput.wallets.includes(type)) {
      setAuraInput((prev) => ({ ...prev, wallets: [...prev.wallets, type] }));
    }
  };

  const addLink = (link: string) => {
    if (!auraInput.links.includes(link)) {
      setAuraInput((prev) => ({ ...prev, links: [...prev.links, link] }));
    }
  };

  const resetAura = () => {
    setAuraInput({ username: "", bio: "", wallets: [], links: [] });
    setCalculatedAura(null);
    setShowAuraResult(false);
  };
  return (
    <div className="min-h-screen">
      <style jsx>{animations}</style>

      {/* Matrix Rain Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={i}
            className="absolute text-primary/20 font-mono text-xs matrix"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + (i % 3)}s`,
            }}
          >
            {Array.from({ length: 20 }, (_, j) => (
              <div key={j} className="block">
                {Math.random() > 0.5 ? "1" : "0"}
              </div>
            ))}
          </div>
        ))}
      </div>
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b-2 border-primary/20 shadow-[0_2px_0px_0px_theme(colors.primary/20)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-none border-2 border-primary flex items-center justify-center shadow-[2px_2px_0px_0px_theme(colors.primary)] group-hover:shadow-[3px_3px_0px_0px_theme(colors.primary)] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-all float group-hover:glitch">
                <span className="text-primary-foreground font-pixel text-xs wiggle">
                  OP
                </span>
              </div>
              <span className="font-pixel text-lg text-foreground group-hover:shake transition-all">
                open-purse
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="#features"
                className="font-pixel-sm text-muted-foreground hover:text-foreground transition-colors hover:bounce"
              >
                Features
              </Link>
              <Link
                href="#aura"
                className="font-pixel-sm text-muted-foreground hover:text-foreground transition-colors hover:pulse"
              >
                Aura Calculator
              </Link>
              <Link
                href="https://app.radicle.xyz/nodes/seed.radicle.garden/rad:zLgjwq88he45CuZ9j1uzV6Xbh8yo"
                target="_blank"
                className="font-pixel-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 hover:wiggle"
              >
                <BiSolidInvader className="h-4 w-4 float" />
                Source
              </Link>
            </div>

            {/* CTA Button */}
            <div className="flex items-center space-x-4">
              <Button
                asChild
                size="sm"
                className="font-pixel-sm shadow-[2px_2px_0px_0px_theme(colors.primary)] hover:shadow-[3px_3px_0px_0px_theme(colors.primary)] hover:translate-x-[-1px] hover:translate-y-[-1px] pulse hover:glitch"
              >
                <Link href="/new">Create Purse</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-[90vh] flex flex-col justify-center bg-gradient-to-br from-primary/10 to-accent/10 px-4 relative overflow-hidden">
        {/* 8-bit background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:8px_8px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto text-center space-y-12 relative z-10">
          {/* Main Hero Content */}
          <div className="space-y-8">
            {/* Pixelated title with retro glow */}
            <div className="relative">
              <h1
                className={`${pressStart2P.className} text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground tracking-tight relative pulse hover:glitch cursor-default`}
                style={{
                  textShadow:
                    "4px 4px 0px var(--primary), 8px 8px 0px var(--secondary)",
                  filter: "drop-shadow(0 0 20px rgba(255, 0, 77, 0.3))",
                }}
              >
                open-purse
              </h1>
              {/* 8-bit border effect */}
              <div className="absolute -inset-4 border-2 border-primary/20 rounded-none shadow-[8px_8px_0px_0px_theme(colors.accent/20)] -z-10 float"></div>

              {/* Floating particles around title */}
              <div className="absolute -inset-8 pointer-events-none">
                {Array.from({ length: 8 }, (_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-primary rounded-none float"
                    style={{
                      left: `${20 + i * 10}%`,
                      top: `${10 + (i % 3) * 30}%`,
                      animationDelay: `${i * 0.5}s`,
                      animationDuration: `${2 + (i % 2)}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="relative overflow-hidden">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mt-4 max-w-3xl mx-auto font-pixel-sm float">
                Accept donations without BS. One link, all your payment methods,
                completely under your control.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              asChild
              className="text-lg px-8 py-6 font-pixel-sm shadow-[4px_4px_0px_0px_theme(colors.primary)] hover:shadow-[6px_6px_0px_0px_theme(colors.primary)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150 bounce hover:pulse hover:glitch"
            >
              <Link href="/new">
                Create Your Purse
                <ArrowRight className="ml-2 h-5 w-5 float" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="text-lg px-8 py-6 font-pixel-sm border-2 shadow-[4px_4px_0px_0px_theme(colors.muted)] hover:shadow-[6px_6px_0px_0px_theme(colors.muted)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150 hover:wiggle"
            >
              <Link href="https://app.radicle.xyz/nodes/seed.radicle.garden/rad:zLgjwq88he45CuZ9j1uzV6Xbh8yo">
                <BiSolidInvader className="mr-2 h-5 w-5 float" />
                View Source
              </Link>
            </Button>
          </div>

          {/* Hero Stats/Features Preview */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8">
            <div className="text-center space-y-2 float hover:bounce cursor-pointer group">
              <div className="text-3xl font-pixel text-primary pulse group-hover:shake">
                0%
              </div>
              <div className="font-pixel-sm text-xs text-muted-foreground group-hover:wiggle">
                Platform Fees
              </div>
            </div>
            <div
              className="text-center space-y-2 hover:bounce cursor-pointer group"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="text-3xl font-pixel text-secondary pulse group-hover:glitch">
                100%
              </div>
              <div className="font-pixel-sm text-xs text-muted-foreground group-hover:wiggle">
                Your Money
              </div>
            </div>
            <div
              className="text-center space-y-2 float hover:bounce cursor-pointer group"
              style={{ animationDelay: "1s" }}
            >
              <div className="text-3xl font-pixel text-accent wiggle group-hover:pulse">
                ∞
              </div>
              <div className="font-pixel-sm text-xs text-muted-foreground group-hover:shake">
                Wallet Support
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-pixel text-foreground mb-4">
              Why Open Purse?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Traditional donation platforms take cuts, impose restrictions, and
              control your data. We believe creators deserve better.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-pixel text-foreground">
                The Problem
              </h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Platform fees eating into your donations (5-10% or more)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Account suspensions and payment freezes without warning
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <span>Complex setup with multiple payment processors</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-destructive rounded-full mt-2 flex-shrink-0"></div>
                  <span>Your supporters&apos; data harvested and sold</span>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-pixel text-foreground">
                Our Solution
              </h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <span>Zero platform fees - keep 100% of your donations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <span>Self-hosted and decentralized - you own your data</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <span>One QR code, all payment methods unified</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                  <span>Cryptographic identity prevents impersonation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-pixel text-foreground mb-4">
              Built for Creators
            </h2>
            <p className="text-xl text-muted-foreground">
              Everything you need to accept donations, tips, and payments from
              your community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 border-primary/20 shadow-[6px_6px_0px_0px_theme(colors.primary/20)] hover:shadow-[8px_8px_0px_0px_theme(colors.primary/30)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 bg-gradient-to-br from-card to-card/80 float hover:pulse group">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-destructive rounded-none mb-4 flex items-center justify-center shadow-[3px_3px_0px_0px_theme(colors.background)] bounce group-hover:wiggle">
                  <Wallet className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="font-pixel-sm text-primary group-hover:shake">
                  Multi-Wallet Support
                </CardTitle>
                <CardDescription className="font-pixel-sm text-xs">
                  Accept any crypto in one place.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card
              className="border-2 border-secondary/20 shadow-[6px_6px_0px_0px_theme(colors.secondary/20)] hover:shadow-[8px_8px_0px_0px_theme(colors.secondary/30)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 bg-gradient-to-br from-card to-card/80 hover:pulse group"
              style={{ animationDelay: "0.3s" }}
            >
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-none mb-4 flex items-center justify-center shadow-[3px_3px_0px_0px_theme(colors.background)] float group-hover:bounce">
                  <QrCode className="h-6 w-6 text-secondary-foreground wiggle" />
                </div>
                <CardTitle className="font-pixel-sm text-secondary group-hover:glitch">
                  QR Code Sharing
                </CardTitle>
                <CardDescription className="font-pixel-sm text-xs">
                  Generate a QR code that contains all your payment info.
                  Perfect for streams, videos, or IRL events.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-ring/20 shadow-[6px_6px_0px_0px_theme(colors.ring/20)] hover:shadow-[8px_8px_0px_0px_theme(colors.ring/30)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 bg-gradient-to-br from-card to-card/80">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-ring to-primary rounded-none mb-4 flex items-center justify-center shadow-[3px_3px_0px_0px_theme(colors.background)]">
                  <Key className="h-6 w-6 text-background" />
                </div>
                <CardTitle className="font-pixel-sm text-ring">
                  Verified Identity
                </CardTitle>
                <CardDescription className="font-pixel-sm text-xs">
                  Unique purse:xxxx identifier prevents impersonation and builds
                  trust with your audience.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-accent/20 shadow-[6px_6px_0px_0px_theme(colors.accent/20)] hover:shadow-[8px_8px_0px_0px_theme(colors.accent/30)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 bg-gradient-to-br from-card to-card/80">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-none mb-4 flex items-center justify-center shadow-[3px_3px_0px_0px_theme(colors.background)]">
                  <Shield className="h-6 w-6 text-accent-foreground" />
                </div>
                <CardTitle className="font-pixel-sm text-accent">
                  Privacy First
                </CardTitle>
                <CardDescription className="font-pixel-sm text-xs">
                  No tracking, no data collection, no surveillance. Your
                  supporters&apos; privacy is protected.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-destructive/20 shadow-[6px_6px_0px_0px_theme(colors.destructive/20)] hover:shadow-[8px_8px_0px_0px_theme(colors.destructive/30)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 bg-gradient-to-br from-card to-card/80">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-destructive to-ring rounded-none mb-4 flex items-center justify-center shadow-[3px_3px_0px_0px_theme(colors.background)]">
                  <Zap className="h-6 w-6 text-destructive-foreground" />
                </div>
                <CardTitle className="font-pixel-sm text-destructive">
                  Lightning Fast
                </CardTitle>
                <CardDescription className="font-pixel-sm text-xs">
                  Static sites mean instant loading. No databases, no servers,
                  no downtime.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-primary/20 shadow-[6px_6px_0px_0px_theme(colors.primary/20)] hover:shadow-[8px_8px_0px_0px_theme(colors.primary/30)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 bg-gradient-to-br from-card to-card/80">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-none mb-4 flex items-center justify-center shadow-[3px_3px_0px_0px_theme(colors.background)]">
                  <Globe className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="font-pixel-sm text-primary">
                  Global by Design
                </CardTitle>
                <CardDescription className="font-pixel-sm text-xs">
                  Works anywhere in the world. No geographic restrictions or
                  payment processor limitations.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Self-Hosting Section */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-pixel text-foreground mb-4">
                  Own Your Infrastructure
                </h2>
                <p className="text-xl text-muted-foreground">
                  Deploy Open Purse on your own domain. No vendor lock-in, no
                  platform risk, complete control.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Code className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-pixel-sm text-foreground mb-1">
                      Open Source
                    </h3>
                    <p className="text-muted-foreground">
                      Full source code available. Audit, modify, or contribute
                      back to the community.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Download className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-pixel-sm text-foreground mb-1">
                      Easy Deployment
                    </h3>
                    <p className="text-muted-foreground">
                      Deploy to Vercel, Netlify, or your own server with one
                      command. No complex setup required.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Users className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-pixel-sm text-foreground mb-1">
                      Community Driven
                    </h3>
                    <p className="text-muted-foreground">
                      Built by creators, for creators. Join our community and
                      help shape the future.
                    </p>
                  </div>
                </div>
              </div>

              <Button variant="outline" size="lg" asChild>
                <Link href="https://app.radicle.xyz/nodes/seed.radicle.garden/rad:zLgjwq88he45CuZ9j1uzV6Xbh8yo">
                  <Download className="mr-2 h-5 w-5" />
                  Get the Code
                </Link>
              </Button>
            </div>

            <Card className="p-8 bg-muted/50 border-2 border-dashed border-muted-foreground/20">
              <CardContent className="space-y-4 p-0">
                <h3 className="text-xl font-pixel text-foreground">
                  Quick Deploy
                </h3>
                <div className="bg-background p-4 rounded-lg border font-mono text-sm">
                  <div className="text-muted-foreground">
                    # Clone the repository
                  </div>
                  <div>rad clone rad:zLgjwq88he45CuZ9j1uzV6Xbh8yo</div>
                  <br />
                  <div className="text-muted-foreground">
                    # Install dependencies
                  </div>
                  <div>bun install</div>
                  <br />
                  <div className="text-muted-foreground"># RUN IT!</div>
                  <div>bun run build && bun run start</div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Your own Open Purse instance running in under 1 minute.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Aura Calculator Section */}
      <section
        id="aura"
        className="py-24 px-4 bg-destructive relative overflow-hidden"
      >
        {/* Wild 8-bit background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_3px_3px,rgba(255,255,255,0.15)_3px,transparent_0)] bg-[length:24px_24px] pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-pixel text-destructive-foreground mb-6 relative animate-pulse">
              LET&apos;S CALCULATE YOUR AURA BTW
              <div className="absolute -inset-4 border-4 border-ring rounded-none shadow-[8px_8px_0px_0px_theme(colors.ring)] -z-10"></div>
            </h2>
            <p className="text-xl text-destructive-foreground/90 font-pixel-sm max-w-3xl mx-auto">
              Our AI-powered algorithm (a single Javascript function) analyzes
              your crypto behavior to determine your digital aura. Are you a
              hacker1337 or just another normie? Let&apos;s find out!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Input Section */}
            <Card className="border-4 border-ring shadow-[8px_8px_0px_0px_theme(colors.ring)] bg-gradient-to-br from-background to-muted">
              <CardHeader>
                <CardTitle className="font-pixel text-destructive flex items-center gap-2">
                  <Sparkles className="h-6 w-6" />
                  Tell Us About Yourself
                </CardTitle>
                <CardDescription className="font-pixel-sm">
                  The more info, the more accurate your aura calculation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className="font-pixel-sm text-foreground">
                    Username
                  </label>
                  <Input
                    placeholder="your_crypto_username"
                    value={auraInput.username}
                    onChange={(e) =>
                      setAuraInput((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    className="font-pixel-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-pixel-sm text-foreground">
                    Bio/Description
                  </label>
                  <Textarea
                    placeholder="Tell us about your crypto journey, what you do, your interests..."
                    value={auraInput.bio}
                    onChange={(e) =>
                      setAuraInput((prev) => ({ ...prev, bio: e.target.value }))
                    }
                    className="font-pixel-sm min-h-[100px]"
                  />
                </div>

                <div className="space-y-4">
                  <label className="font-pixel-sm text-foreground">
                    Crypto Wallets
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      "Bitcoin",
                      "Ethereum",
                      "Monero",
                      "Solana",
                      "Cardano",
                      "Dogecoin",
                    ].map((wallet) => (
                      <Button
                        key={wallet}
                        size="sm"
                        variant={
                          auraInput.wallets.includes(wallet)
                            ? "default"
                            : "outline"
                        }
                        onClick={() => addWallet(wallet)}
                        className="font-pixel-sm text-xs"
                      >
                        {wallet}
                      </Button>
                    ))}
                  </div>
                  {auraInput.wallets.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {auraInput.wallets.map((wallet) => (
                        <Badge
                          key={wallet}
                          variant="secondary"
                          className="font-pixel-sm"
                        >
                          {wallet}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <label className="font-pixel-sm text-foreground">
                    Social Platforms
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      "Twitter",
                      "GitHub",
                      "Twitch",
                      "YouTube",
                      "Discord",
                      "TikTok",
                    ].map((platform) => (
                      <Button
                        key={platform}
                        size="sm"
                        variant={
                          auraInput.links.includes(platform)
                            ? "default"
                            : "outline"
                        }
                        onClick={() => addLink(platform)}
                        className="font-pixel-sm text-xs"
                      >
                        {platform}
                      </Button>
                    ))}
                  </div>
                  {auraInput.links.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {auraInput.links.map((link) => (
                        <Badge
                          key={link}
                          variant="secondary"
                          className="font-pixel-sm"
                        >
                          {link}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={handleCalculateAura}
                    className="flex-1 font-pixel-sm shadow-[4px_4px_0px_0px_theme(colors.primary)] hover:shadow-[6px_6px_0px_0px_theme(colors.primary)] hover:translate-x-[-2px] hover:translate-y-[-2px] pulse hover:glitch"
                  >
                    <Dice1 className="mr-2 h-4 w-4 bounce" />
                    Calculate My Aura
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetAura}
                    className="font-pixel-sm hover:wiggle"
                  >
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Result Section */}
            <div className="space-y-6">
              {!showAuraResult ? (
                <Card className="border-4 border-dashed border-muted-foreground/30 bg-muted/20 text-center py-16 pulse">
                  <CardContent>
                    <div className="text-6xl mb-4 float">🎮</div>
                    <p className="font-pixel-sm text-muted-foreground wiggle">
                      Your aura will appear here once calculated...
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <Card
                  className={`border-4 border-ring shadow-[8px_8px_0px_0px_theme(colors.ring)] bg-gradient-to-br ${calculatedAura?.color} text-center overflow-hidden relative`}
                >
                  <div className="absolute inset-0 bg-background/80"></div>
                  <CardContent className="py-12 relative z-10">
                    <div className="text-8xl mb-6 bounce">
                      {calculatedAura?.emoji}
                    </div>
                    <h3 className="text-3xl font-pixel text-foreground mb-4 pulse">
                      {calculatedAura?.name}
                    </h3>
                    <p className="text-lg font-pixel-sm text-muted-foreground mb-8 float">
                      {calculatedAura?.description}
                    </p>
                    <div className="space-y-4">
                      <p className="font-pixel-sm text-sm text-muted-foreground wiggle">
                        This is how your purse would look with this aura!
                      </p>
                      <Button
                        size="lg"
                        asChild
                        className="font-pixel-sm shadow-[4px_4px_0px_0px_theme(colors.primary)] hover:shadow-[6px_6px_0px_0px_theme(colors.primary)] hover:translate-x-[-2px] hover:translate-y-[-2px] bounce hover:glitch"
                      >
                        <Link href="/new">
                          Create My Purse Now
                          <ArrowRight className="ml-2 h-5 w-5 float" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Sample Auras */}
              <Card className="border-2 border-accent/20 shadow-[4px_4px_0px_0px_theme(colors.accent/20)] bg-gradient-to-br from-card to-card/80">
                <CardHeader>
                  <CardTitle className="font-pixel-sm text-accent">
                    Sample Auras
                  </CardTitle>
                  <CardDescription className="font-pixel-sm text-xs">
                    Some legendary auras you might unlock
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: "hacker1337", emoji: "🕶️", desc: "Privacy guru" },
                      {
                        name: "degen_king",
                        emoji: "👑",
                        desc: "Risk incarnate",
                      },
                      {
                        name: "diamond_hands",
                        emoji: "💎",
                        desc: "HODL master",
                      },
                      { name: "nft_legend", emoji: "🎨", desc: "Art pioneer" },
                    ].map((aura) => (
                      <div
                        key={aura.name}
                        className="text-center p-3 border-2 border-muted rounded-none bg-muted/20"
                      >
                        <div className="text-2xl mb-1">{aura.emoji}</div>
                        <div className="font-pixel-sm text-xs text-foreground">
                          {aura.name}
                        </div>
                        <div className="font-pixel-sm text-[10px] text-muted-foreground">
                          {aura.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-primary relative overflow-hidden">
        {/* 8-bit background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:12px_12px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <h2 className="text-4xl font-pixel relative">
            Ready to Take Control?
            <div className="absolute -inset-2 border-2 border-primary-foreground/20 rounded-none shadow-[4px_4px_0px_0px_rgba(255,255,255,0.1)] -z-10"></div>
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto font-pixel-sm">
            Join creators who&apos;ve already switched to a better way. Create
            your purse in minutes, keep 100% of your donations, and never worry
            about platform fees again.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="text-lg px-8 py-6 font-pixel-sm border-2 shadow-[4px_4px_0px_0px_theme(colors.secondary)] hover:shadow-[6px_6px_0px_0px_theme(colors.secondary)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150"
            >
              <Link href="/new">
                Create Your Purse Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 py-6 font-pixel-sm border-2 border-primary-foreground shadow-[4px_4px_0px_0px_theme(colors.primary-foreground)] hover:shadow-[6px_6px_0px_0px_theme(colors.primary-foreground)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150"
            >
              <Link href="https://app.radicle.xyz/nodes/seed.radicle.garden/rad:zLgjwq88he45CuZ9j1uzV6Xbh8yo">
                <BiSolidInvader className="mr-2 h-5 w-5" />
                Self-Host Instead
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
