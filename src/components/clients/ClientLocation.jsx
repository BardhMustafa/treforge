export function ClientLocation({ location, exportMarket }) {
  if (!location) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 10 }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "'Space Mono',monospace",
        fontSize: 12,
        lineHeight: 1.6,
        color: "rgba(255,255,255,0.6)",
      }}>
        <svg width="14" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" style={{ flexShrink: 0, color: "#00ffb4" }}>
          <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
          <circle cx="12" cy="10" r="2.5" />
        </svg>
        <span>{location}</span>
      </div>
      {exportMarket && (
        <span style={{
          padding: "5px 9px",
          border: "1px solid rgba(0,255,180,0.18)",
          background: "rgba(0,255,180,0.04)",
          color: "#00ffb4",
          fontFamily: "'Space Mono',monospace",
          fontSize: 9,
          lineHeight: 1.5,
          letterSpacing: 1,
          textTransform: "uppercase",
        }}>
          Exporting to {exportMarket}
        </span>
      )}
    </div>
  );
}
