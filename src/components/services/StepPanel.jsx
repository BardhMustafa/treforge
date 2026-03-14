// Renders the expand panel for a clicked pipeline node.
// step: { label, benefit, tech: string[] }
// index: number — 0-based node index

export function StepPanel({ step, index }) {
  if (!step) return null;

  return (
    <div
      style={{
        marginTop: 24,
        padding: "28px 32px",
        border: "1px solid rgba(0,255,180,0.15)",
        background: "rgba(0,255,180,0.03)",
        borderRadius: 4,
      }}
    >
      {/* Header */}
      <div
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          color: "#00ffb4",
          letterSpacing: 4,
          textTransform: "uppercase",
          marginBottom: 14,
          opacity: 0.7,
        }}
      >
        STEP_{String(index + 1).padStart(2, "0")} — {step.label.toUpperCase()}
      </div>

      {/* Business benefit */}
      <p
        style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 14,
          color: "rgba(255,255,255,0.85)",
          lineHeight: 1.8,
          margin: "0 0 20px",
        }}
      >
        {step.benefit}
      </p>

      {/* Tech bullets */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {step.tech.map((item) => (
          <div
            key={item}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              fontFamily: "'Space Mono', monospace",
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.6,
            }}
          >
            <span style={{ color: "#00ffb4", flexShrink: 0, marginTop: 2 }}>◇</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
