// Modal overlay for a clicked pipeline node.
// step: { label, benefit, tech: string[] }
// index: number — 0-based node index
// onClose, onPrev, onNext: () => void
// hasPrev, hasNext: boolean

export function StepPanel({ step, index, onClose, onPrev, onNext, hasPrev, hasNext }) {
  if (!step) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(4px)",
          zIndex: 100,
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 101,
          width: "min(560px, 90vw)",
          background: "#0a0a0a",
          border: "1px solid rgba(0,255,180,0.2)",
          borderRadius: 4,
          padding: "40px 40px 36px",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "none",
            border: "none",
            color: "rgba(255,255,255,0.3)",
            fontFamily: "'Space Mono', monospace",
            fontSize: 11,
            letterSpacing: 2,
            cursor: "pointer",
            padding: "4px 8px",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#00ffb4")}
          onMouseLeave={(e) => (e.target.style.color = "rgba(255,255,255,0.3)")}
        >
          ✕ CLOSE
        </button>

        {/* Header */}
        <div
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            color: "#00ffb4",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 16,
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
            lineHeight: 1.9,
            margin: "0 0 28px",
          }}
        >
          {step.benefit}
        </p>

        {/* Divider */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginBottom: 24 }} />

        {/* Tech bullets */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {(step.tech ?? []).map((item) => (
            <div
              key={item}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                fontFamily: "'Space Mono', monospace",
                fontSize: 12,
                color: "rgba(255,255,255,0.55)",
                lineHeight: 1.7,
              }}
            >
              <span style={{ color: "#00ffb4", flexShrink: 0, marginTop: 3 }}>◇</span>
              {item}
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 32,
            borderTop: "1px solid rgba(255,255,255,0.06)",
            paddingTop: 20,
          }}
        >
          <NavArrow onClick={onPrev} disabled={!hasPrev} label="← PREV" />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: 3,
            }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <NavArrow onClick={onNext} disabled={!hasNext} label="NEXT →" />
        </div>
      </div>
    </>
  );
}

function NavArrow({ onClick, disabled, label }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: "none",
        border: "1px solid rgba(255,255,255,0.08)",
        color: disabled ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.6)",
        fontFamily: "'Space Mono', monospace",
        fontSize: 10,
        letterSpacing: 2,
        cursor: disabled ? "default" : "pointer",
        padding: "8px 16px",
        borderRadius: 2,
        transition: "color 0.15s, border-color 0.15s",
      }}
      onMouseEnter={(e) => { if (!disabled) { e.currentTarget.style.color = "#00ffb4"; e.currentTarget.style.borderColor = "rgba(0,255,180,0.4)"; } }}
      onMouseLeave={(e) => { if (!disabled) { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; } }}
    >
      {label}
    </button>
  );
}
