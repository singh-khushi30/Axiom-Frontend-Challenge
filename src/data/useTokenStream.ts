import { useEffect, useState } from "react";
import type { Token } from "../types";
import { generateTokens } from "./generateTokens";

interface StreamOptions {
  /** How many tokens to seed the feed with. */
  count: number;
  /** Milliseconds between update ticks. */
  intervalMs: number;
  /** Fraction of tokens (0–1) that change on every tick. */
  churn: number;
}

/**
 * Simulates a live market data feed.
 *
 * NOTE: this is intentionally simple, not optimal. On every tick it builds a
 * brand-new array containing brand-new objects for the tokens that changed.
 * That new array reference is what gets handed to React.
 */
export function useTokenStream({
  count,
  intervalMs,
  churn,
}: StreamOptions): Token[] {
  const [tokens, setTokens] = useState<Token[]>(() => generateTokens(count));

  useEffect(() => {
    const id = setInterval(() => {
      setTokens((prev) => {
        const updatesPerTick = Math.floor(prev.length * churn);
        // Rebuild the entire list every tick.
        const next = prev.slice();
        for (let i = 0; i < updatesPerTick; i++) {
          const index = Math.floor(Math.random() * next.length);
          const token = next[index];
          const drift = 1 + (Math.random() - 0.5) * 0.08;
          const priceUsd = token.priceUsd * drift;
          next[index] = {
            ...token,
            priceUsd,
            marketCapUsd: token.marketCapUsd * drift,
            volume24hUsd: token.volume24hUsd * (1 + (Math.random() - 0.5) * 0.1),
            txCount: token.txCount + Math.floor(Math.random() * 50),
            priceChangePct: token.priceChangePct + (drift - 1) * 100,
          };
        }
        return next;
      });
    }, intervalMs);

    return () => clearInterval(id);
  }, [count, intervalMs, churn]);

  return tokens;
}
