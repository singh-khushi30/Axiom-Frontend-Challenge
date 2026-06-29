import type { Token } from "../types";
import { TokenRow } from "./TokenRow";

interface TokenListProps {
  tokens: Token[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

/**
 * Renders the feed.
 *
 * NOTE: this maps over every token and mounts a DOM node for each one. With a
 * few hundred rows that's fine; with tens of thousands of live-updating rows it
 * is not. This is the part of the app the challenge is about.
 */
export function TokenList({ tokens, selectedId, onSelect }: TokenListProps) {
  return (
    <div className="feed__list">
      {tokens.map((token) => (
        <TokenRow
          key={token.id}
          token={token}
          selected={token.id === selectedId}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
