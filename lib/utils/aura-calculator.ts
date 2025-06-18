import { PurseData } from "@/lib/actions/get-purse";

export interface AuraResult {
  name: string;
  emoji: string;
  color: string;
  description: string;
}

export function calculateAura(purse: PurseData): AuraResult {
  const { bio, walletAddresses, links, username } = purse;

  const bioLower = bio?.toLowerCase() || "";
  const walletTypes = walletAddresses.map((w) => w.type.toLowerCase());
  const linkUrls = links?.map((l) => l.url.toLowerCase()) || [];
  const linkTitles = links?.map((l) => l.title.toLowerCase()) || [];

  // Scoring system for different traits
  const scores = {
    hacker: 0,
    artist: 0,
    gamer: 0,
    hodler: 0,
    degen: 0,
    influencer: 0,
    minimalist: 0,
    maximalist: 0,
  };

  // Analyze wallet types
  if (walletTypes.includes("monero") || walletTypes.includes("zcash")) {
    scores.hacker += 10;
  }
  if (walletTypes.includes("bitcoin")) {
    scores.hodler += 8;
  }
  if (walletTypes.includes("ethereum")) {
    scores.degen += 6;
  }
  if (walletAddresses.length >= 5) {
    scores.maximalist += 5;
    scores.degen += 3;
  }
  if (walletAddresses.length === 1) {
    scores.minimalist += 4;
  }

  // Analyze bio content
  const hackerKeywords = [
    "privacy",
    "security",
    "encryption",
    "anonymous",
    "tor",
    "vpn",
    "opsec",
    "cyber",
    "hack",
    "dev",
    "code",
  ];
  const artistKeywords = [
    "art",
    "design",
    "creative",
    "draw",
    "paint",
    "music",
    "artist",
    "creator",
    "nft",
    "mint",
  ];
  const gamerKeywords = [
    "game",
    "stream",
    "twitch",
    "gaming",
    "esports",
    "speedrun",
    "minecraft",
    "fps",
    "mmo",
    "rpg",
  ];
  const hodlerKeywords = [
    "hodl",
    "diamond hands",
    "moon",
    "lambo",
    "bitcoin",
    "btc",
    "invest",
    "stack",
    "sats",
  ];
  const degenKeywords = [
    "degen",
    "ape",
    "yolo",
    "fomo",
    "wagmi",
    "gm",
    "defi",
    "yield",
    "farm",
    "leverage",
  ];

  hackerKeywords.forEach((keyword) => {
    if (bioLower.includes(keyword)) scores.hacker += 2;
  });
  artistKeywords.forEach((keyword) => {
    if (bioLower.includes(keyword)) scores.artist += 2;
  });
  gamerKeywords.forEach((keyword) => {
    if (bioLower.includes(keyword)) scores.gamer += 2;
  });
  hodlerKeywords.forEach((keyword) => {
    if (bioLower.includes(keyword)) scores.hodler += 2;
  });
  degenKeywords.forEach((keyword) => {
    if (bioLower.includes(keyword)) scores.degen += 2;
  });

  // Analyze links
  const allLinks = [...linkUrls, ...linkTitles];

  if (
    allLinks.some((link) => link.includes("github") || link.includes("gitlab"))
  ) {
    scores.hacker += 4;
  }
  if (
    allLinks.some(
      (link) =>
        link.includes("twitch") ||
        link.includes("youtube") ||
        link.includes("kick"),
    )
  ) {
    scores.gamer += 4;
    scores.influencer += 2;
  }
  if (
    allLinks.some(
      (link) =>
        link.includes("twitter") ||
        link.includes("instagram") ||
        link.includes("tiktok"),
    )
  ) {
    scores.influencer += 3;
  }
  if (
    allLinks.some(
      (link) =>
        link.includes("opensea") ||
        link.includes("foundation") ||
        link.includes("superrare"),
    )
  ) {
    scores.artist += 4;
  }
  if (
    allLinks.some(
      (link) =>
        link.includes("uniswap") ||
        link.includes("compound") ||
        link.includes("aave"),
    )
  ) {
    scores.degen += 4;
  }

  // Bonus points for specific patterns
  if (links && links.length >= 5) {
    scores.influencer += 3;
    scores.maximalist += 2;
  }
  if (!bio || bio.length < 20) {
    scores.minimalist += 3;
  }
  if (bio && bio.length > 200) {
    scores.maximalist += 2;
  }

  // Username analysis
  const usernameLower = username.toLowerCase();
  if (
    usernameLower.includes("anon") ||
    usernameLower.includes("priv") ||
    usernameLower.includes("shadow")
  ) {
    scores.hacker += 3;
  }
  if (
    usernameLower.includes("art") ||
    usernameLower.includes("design") ||
    usernameLower.includes("create")
  ) {
    scores.artist += 2;
  }
  if (
    usernameLower.includes("game") ||
    usernameLower.includes("stream") ||
    usernameLower.includes("play")
  ) {
    scores.gamer += 2;
  }

  // Find the highest scoring aura
  const topAura = Object.entries(scores).reduce((a, b) =>
    scores[a[0] as keyof typeof scores] > scores[b[0] as keyof typeof scores]
      ? a
      : b,
  );
  const [auraType, score] = topAura;

  // Return aura based on type and score
  switch (auraType) {
    case "hacker":
      if (score >= 15)
        return {
          name: "hacker1337",
          emoji: "🕶️",
          color: "from-green-400 to-emerald-600",
          description: "Master of digital shadows",
        };
      if (score >= 8)
        return {
          name: "privacy_guru",
          emoji: "🔒",
          color: "from-green-400 to-cyan-500",
          description: "Guardian of anonymity",
        };
      return {
        name: "tech_savvy",
        emoji: "💻",
        color: "from-blue-400 to-green-500",
        description: "Code warrior",
      };

    case "artist":
      if (score >= 12)
        return {
          name: "nft_legend",
          emoji: "🎨",
          color: "from-purple-400 to-pink-600",
          description: "Digital art pioneer",
        };
      if (score >= 6)
        return {
          name: "creator",
          emoji: "✨",
          color: "from-pink-400 to-purple-500",
          description: "Artistic visionary",
        };
      return {
        name: "aesthetic",
        emoji: "🌸",
        color: "from-pink-300 to-rose-400",
        description: "Beauty curator",
      };

    case "gamer":
      if (score >= 12)
        return {
          name: "esports_pro",
          emoji: "🏆",
          color: "from-yellow-400 to-orange-600",
          description: "Champion of the arena",
        };
      if (score >= 6)
        return {
          name: "streamer",
          emoji: "🎮",
          color: "from-purple-400 to-blue-500",
          description: "Entertainment wizard",
        };
      return {
        name: "player",
        emoji: "🎯",
        color: "from-blue-400 to-purple-500",
        description: "Game enthusiast",
      };

    case "hodler":
      if (score >= 12)
        return {
          name: "diamond_hands",
          emoji: "💎",
          color: "from-blue-400 to-indigo-600",
          description: "Unshakeable conviction",
        };
      if (score >= 6)
        return {
          name: "btc_maxi",
          emoji: "₿",
          color: "from-orange-400 to-yellow-500",
          description: "Bitcoin believer",
        };
      return {
        name: "investor",
        emoji: "📈",
        color: "from-green-400 to-blue-500",
        description: "Market navigator",
      };

    case "degen":
      if (score >= 15)
        return {
          name: "degen_king",
          emoji: "👑",
          color: "from-red-400 to-pink-600",
          description: "Risk incarnate",
        };
      if (score >= 8)
        return {
          name: "yield_farmer",
          emoji: "🌾",
          color: "from-green-400 to-yellow-500",
          description: "DeFi harvester",
        };
      return {
        name: "ape_strong",
        emoji: "🦍",
        color: "from-green-400 to-red-500",
        description: "YOLO specialist",
      };

    case "influencer":
      if (score >= 10)
        return {
          name: "thought_leader",
          emoji: "🧠",
          color: "from-purple-400 to-blue-600",
          description: "Mind shaper",
        };
      if (score >= 5)
        return {
          name: "content_creator",
          emoji: "📱",
          color: "from-pink-400 to-purple-500",
          description: "Attention architect",
        };
      return {
        name: "connected",
        emoji: "🔗",
        color: "from-blue-400 to-cyan-500",
        description: "Network node",
      };

    case "maximalist":
      return {
        name: "collector",
        emoji: "🗃️",
        color: "from-purple-400 to-indigo-600",
        description: "Digital hoarder",
      };

    case "minimalist":
      return {
        name: "zen_master",
        emoji: "🧘",
        color: "from-gray-400 to-slate-600",
        description: "Less is more",
      };

    default:
      // Fallback auras based on basic criteria
      if (walletAddresses.length === 0) {
        return {
          name: "newbie",
          emoji: "🌱",
          color: "from-green-300 to-emerald-400",
          description: "Just getting started",
        };
      }
      return {
        name: "crypto_native",
        emoji: "⚡",
        color: "from-yellow-400 to-orange-500",
        description: "Digital pioneer",
      };
  }
}
