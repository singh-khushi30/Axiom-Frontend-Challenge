import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
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
  const parentRef = useRef<HTMLDivElement>(null);

const rowVirtualizer = useVirtualizer({
  count: tokens.length,
  getScrollElement: () => parentRef.current,
  estimateSize: () => 52,
  overscan: 8,
});
  
return (
  <div
    ref={parentRef}
    className="feed__list"
  >
    <div
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        width: "100%",
        position: "relative",
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const token = tokens[virtualRow.index];

        return (
          <div
            key={token.id}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <TokenRow
              token={token}
              selected={token.id === selectedId}
              onSelect={onSelect}
            />
          </div>
        );
      })}
    </div>
  </div>
);
}
