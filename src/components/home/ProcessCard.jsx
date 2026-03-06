import { useState } from "react";
import { useIsSmallScreen } from "../../hooks";

export function ProcessCard({ num, title, body }) {
  const [hov, setHov] = useState(false);
  const isSmall = useIsSmallScreen();
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex",
        gap: isSmall ? 16 : 22,
        padding: isSmall ? "20px 20px" : "26px 28px",
        background: hov ? "rgba(0,255,180,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hov ? "rgba(0,255,180,0.2)" : "rgba(255,255,255,0.06)"}`,
        transition: "all 0.2s",
      }}
    >
      <div
        style={{
          fontFamily: "'Orbitron',monospace",
          fontSize: 12,
          color: "#00ffb4",
          opacity: 0.55,
          minWidth: 30,
          fontWeight: 700,
          paddingTop: 2,
        }}
      >
        {num}
      </div>
      <div>
        <div
          style={{
            fontFamily: "'Orbitron',monospace",
            fontSize: 13,
            fontWeight: 700,
            color: "#fff",
            marginBottom: 8,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: 12,
            color: "rgba(255,255,255,0.42)",
            lineHeight: 1.75,
          }}
        >
          {body}
        </div>
      </div>
    </div>
  );
}
