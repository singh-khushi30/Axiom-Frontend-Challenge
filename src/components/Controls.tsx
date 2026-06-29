export type SortKey =
  | "marketCapUsd"
  | "volume24hUsd"
  | "priceChangePct"
  | "ageSeconds";

interface ControlsProps {
  query: string;
  onQueryChange: (value: string) => void;
  sortKey: SortKey;
  onSortKeyChange: (value: SortKey) => void;
  visibleCount: number;
  totalCount: number;
}

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "marketCapUsd", label: "Market Cap" },
  { key: "volume24hUsd", label: "Volume" },
  { key: "priceChangePct", label: "24h Change" },
  { key: "ageSeconds", label: "Age" },
];

export function Controls({
  query,
  onQueryChange,
  sortKey,
  onSortKeyChange,
  visibleCount,
  totalCount,
}: ControlsProps) {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Search by name or ticker…"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <select
        value={sortKey}
        onChange={(e) => onSortKeyChange(e.target.value as SortKey)}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.key} value={opt.key}>
            Sort: {opt.label}
          </option>
        ))}
      </select>
      <span className="controls__count">
        {visibleCount.toLocaleString("en-US")} /{" "}
        {totalCount.toLocaleString("en-US")}
      </span>
    </div>
  );
}
