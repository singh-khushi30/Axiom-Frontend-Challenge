import type { Token } from "../types";

const NAME_PREFIXES = [
  "Solar",
  "Lunar",
  "Hyper",
  "Mega",
  "Turbo",
  "Quantum",
  "Degen",
  "Based",
  "Giga",
  "Neon",
  "Astro",
  "Pixel",
  "Cyber",
  "Atomic",
  "Cosmic",
];

const NAME_SUFFIXES = [
  "Cat",
  "Dog",
  "Inu",
  "Pepe",
  "Moon",
  "Rocket",
  "Coin",
  "Floki",
  "Wif",
  "Bonk",
  "Chad",
  "Ape",
  "Frog",
  "Bull",
  "Doge",
];

/**
 * Deterministic-ish pseudo random so the dataset looks the same shape on every
 * reload. Not cryptographic — just enough variety for a realistic feed.
 */
function makeRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
}

function pick<T>(rng: () => number, arr: T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

export function generateTokens(count: number): Token[] {
  const rng = makeRandom(42);
  const tokens: Token[] = [];

  for (let i = 0; i < count; i++) {
    const name = `${pick(rng, NAME_PREFIXES)}${pick(rng, NAME_SUFFIXES)}`;
    const ticker = name.slice(0, 4).toUpperCase() + (i % 100);
    const priceUsd = rng() * 10;
    const marketCapUsd = priceUsd * (1_000_000 + rng() * 50_000_000);

    tokens.push({
      id: `tok_${i}`,
      name,
      ticker,
      ageSeconds: Math.floor(rng() * 60 * 60 * 24 * 30),
      priceUsd,
      marketCapUsd,
      volume24hUsd: rng() * 5_000_000,
      liquidityUsd: rng() * 2_000_000,
      holders: Math.floor(rng() * 50_000),
      txCount: Math.floor(rng() * 100_000),
      priceChangePct: (rng() - 0.5) * 200,
    });
  }

  return tokens;
}
