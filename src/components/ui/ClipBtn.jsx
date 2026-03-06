import { useState } from "react";

const clipPath =
  "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))";

export function ClipBtn({ children, onClick, small, as: As = "button", ...props }) {
  const [hov, setHov] = useState(false);
  const style = {
    background: hov ? "#fff" : "#00ffb4",
    border: "none",
    color: "#000",
    padding: small ? "12px 24px" : "15px 32px",
    fontFamily: "'Space Mono',monospace",
    fontWeight: 700,
    fontSize: small ? 11 : 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    transition: "background 0.2s",
    cursor: "pointer",
    clipPath,
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
