import { Link } from "react-router-dom";
import { useIsMobile } from "../../hooks";
import { PAGE_PADDING_X } from "../../constants/layout";

export function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer
      style={{
        padding: `clamp(24px, 4vw, 40px) ${PAGE_PADDING_X}`,
        borderTop: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 16,
        flexDirection: isMobile ? "column" : "row",
        textAlign: isMobile ? "center" : "left",
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          justifyContent: isMobile ? "center" : "flex-start",
          textDecoration: "none",
        }}
      >
        <div
          style={{
            width: 22,
            height: 22,
            border: "1.5px solid rgba(0,255,180,0.5)",
            transform: "rotate(45deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              background: "rgba(0,255,180,0.6)",
              transform: "rotate(-45deg)",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "'Orbitron',monospace",
            fontWeight: 700,
            fontSize: 13,
            color: "rgba(255,255,255,0.45)",
            letterSpacing: 2,
          }}
        >
          TREFORGE
        </span>
      </Link>
      <div
        style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: 10,
          color: "rgba(255,255,255,0.22)",
          letterSpacing: 2,
        }}
      >
        © 2025 TREFORGE. DRIVEN BY AI.
      </div>
    </footer>
  );
}
