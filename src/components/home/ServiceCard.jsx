import { Link } from "react-router-dom";

export function ServiceCard({ service, active, onMouseEnter, onMouseLeave, isSmall, onBrief }) {
  const { slug, icon, title, desc } = service;
  return (
    <div
      style={{ display: "flex", flexDirection: "column", position: "relative" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        to={`/services/${slug}`}
        style={{ textDecoration: "none", color: "inherit", flex: 1 }}
        data-hover
      >
        <div
          style={{
            padding: isSmall ? "28px 24px" : "40px 36px",
            background: active ? "rgba(0,255,180,0.04)" : "rgba(255,255,255,0.02)",
            border: `1px solid ${active ? "rgba(0,255,180,0.28)" : "rgba(255,255,255,0.06)"}`,
            transition: "all 0.25s",
            position: "relative",
            overflow: "hidden",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: 2,
              background: active ? "linear-gradient(90deg,#00ffb4,transparent)" : "transparent",
              transition: "background 0.25s",
            }}
          />
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 32, color: "#00ffb4", marginBottom: 22, transition: "transform 0.25s", transform: active ? "scale(1.12)" : "scale(1)", display: "inline-block" }}>
            {icon}
          </div>
          <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 14px", letterSpacing: 1 }}>
            {title}
          </h3>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.48)", lineHeight: 1.85, margin: 0 }}>
            {desc}
          </p>
          <div style={{ marginTop: "auto", paddingTop: 28, fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#00ffb4", letterSpacing: 3, opacity: active ? 1 : 0, transition: "opacity 0.25s" }}>
            EXPLORE →
          </div>
        </div>
      </Link>
      <button
        onClick={onBrief}
        style={{
          background: "rgba(0,255,180,0.06)",
          border: `1px solid ${active ? "rgba(0,255,180,0.3)" : "rgba(255,255,255,0.06)"}`,
          borderTop: "none",
          color: "#00ffb4",
          padding: "10px 16px",
          fontFamily: "'Space Mono',monospace",
          fontSize: 10,
          letterSpacing: 2,
          cursor: "pointer",
          width: "100%",
          textAlign: "left",
          opacity: active ? 1 : 0,
          transition: "all 0.25s",
        }}
      >
        BRIEF US →
      </button>
    </div>
  );
}
