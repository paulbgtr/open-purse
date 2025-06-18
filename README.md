# OpenPurse

Accept donations without BS. One link, all your payment methods, completely under your control.

## What is OpenPurse?

A simple, self-hosted page for sharing your crypto addresses and social links. No platform fees, no restrictions, no surveillance.

- **Zero fees** - It's basically a static page for your wallet
- **Self-hosted** - You own your data and infrastructure
- **Privacy-first** - No tracking or data collection
- **Global** - Works anywhere, no geographic restrictions

## Quick Start

```bash
# Clone and install
git clone https://seed.radicle.garden/zLgjwq88he45CuZ9j1uzV6Xbh8yo.git open-purse
cd open-purse
bun install

# Set up database
cp .env.example .env
# Edit .env with your database URL

# Run database migrations
bunx drizzle-kit push

# Start development server
bun run dev
```

Visit `http://localhost:3000` and create your first purse.

## Deploy

### Self-Host
```bash
bun run build
bun run start
```

## Features

- 🎮 **8-bit aesthetic** - Retro gaming vibes
- 💰 **Multi-wallet support** - All your crypto addresses in one place
- 🔗 **Social links** - Connect
 all your platforms
- 📱 **QR codes** - Perfect for streams and IRL events
- 🔒 **Verified identity** - Unique purse identifiers prevent impersonation

## Tech Stack

- Next.js 15
- SQLite + Drizzle ORM
- Tailwind CSS
- shadcn/ui
