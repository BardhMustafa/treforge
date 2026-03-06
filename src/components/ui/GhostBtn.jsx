import { useState } from "react";

export function GhostBtn({ children, onClick, small, as: As = "button", ...props }) {
  const [hov, setHov] = useState(false);
  const style = {
    background: "transparent",
    cursor: "pointer",
    border: `1px solid ${hov ? "#00ffb4" : "rgba(255,255,255,0.2)"}`,
    color: hov ? "#00ffb4" : "rgba(255,255,255,0.65)",
    padding: small ? "12px 24px" : "15px 32px",
    fontFamily: "'Space Mono',monospace",
    fontSize: small ? 11 : 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    transition: "all 0.2s",
  };
  return (
    <As
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={style}
      {...props}
    >
      {children}
    </As>
  );
}
