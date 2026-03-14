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
        <img
          src="/logo-no-bg.png"
          alt="Treforge"
          style={{ height: 22, width: "auto", display: "block", opacity: 0.5 }}
        />
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
