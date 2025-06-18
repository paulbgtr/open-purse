import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
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
} from "lucide-react";
import { Press_Start_2P } from "next/font/google";

const pressStart2P = Press_Start_2P({ weight: "400", subsets: ["latin"] });

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 px-4 relative overflow-hidden">
        {/* 8-bit background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[length:8px_8px] pointer-events-none"></div>

        <div className="text-center space-y-8 max-w-4xl relative z-10">
          {/* Pixelated title with retro glow */}
          <div className="relative">
            <h1
              className={`${pressStart2P.className} text-6xl md:text-7xl font-bold text-foreground tracking-tight relative`}
              style={{
                textShadow:
                  "4px 4px 0px var(--primary), 8px 8px 0px var(--secondary)",
                filter: "drop-shadow(0 0 20px rgba(255, 0, 77, 0.3))",
              }}
            >
              open-purse
            </h1>
            {/* 8-bit border effect */}
            <div className="absolute -inset-4 border-2 border-primary/20 rounded-none shadow-[8px_8px_0px_0px_theme(colors.accent/20)] -z-10"></div>
          </div>

          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-pixel-sm">
            Accept donations without BS. One link, all your payment methods,
            completely under your control.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button
              size="lg"
              asChild
              className="text-lg px-8 py-6 font-pixel-sm shadow-[4px_4px_0px_0px_theme(colors.primary)] hover:shadow-[6px_6px_0px_0px_theme(colors.primary)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150"
            >
              <Link href="/new">
                Create Your Purse
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="text-lg px-8 py-6 font-pixel-sm border-2 shadow-[4px_4px_0px_0px_theme(colors.muted)] hover:shadow-[6px_6px_0px_0px_theme(colors.muted)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-150"
            >
              <Link href="https://app.radicle.xyz/nodes/seed.radicle.garden/rad:zLgjwq88he45CuZ9j1uzV6Xbh8yo">
                <BiSolidInvader className="mr-2 h-5 w-5" />
                View Source
              </Link>
            </Button>
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
      <section className="py-24 px-4 bg-muted/30">
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
            <Card className="border-2 border-primary/20 shadow-[6px_6px_0px_0px_theme(colors.primary/20)] hover:shadow-[8px_8px_0px_0px_theme(colors.primary/30)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 bg-gradient-to-br from-card to-card/80">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-destructive rounded-none mb-4 flex items-center justify-center shadow-[3px_3px_0px_0px_theme(colors.background)]">
                  <Wallet className="h-6 w-6 text-primary-foreground" />
                </div>
                <CardTitle className="font-pixel-sm text-primary">
                  Multi-Wallet Support
                </CardTitle>
                <CardDescription className="font-pixel-sm text-xs">
                  Accept any crypto in one place.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-2 border-secondary/20 shadow-[6px_6px_0px_0px_theme(colors.secondary/20)] hover:shadow-[8px_8px_0px_0px_theme(colors.secondary/30)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all duration-200 bg-gradient-to-br from-card to-card/80">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-none mb-4 flex items-center justify-center shadow-[3px_3px_0px_0px_theme(colors.background)]">
                  <QrCode className="h-6 w-6 text-secondary-foreground" />
                </div>
                <CardTitle className="font-pixel-sm text-secondary">
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

      {/* CTA Section */}
      <section className="py-24 px-4 relative overflow-hidden">
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
