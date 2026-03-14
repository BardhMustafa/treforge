import { useState } from "react";
import { useBriefModal } from "../../context/BriefModalContext";

export function TalkBtn({ children }) {
  const [hov, setHov] = useState(false);
  const { openBrief } = useBriefModal();
  const style = {
    background: hov ? "#00ffb4" : "transparent",
    border: "1.5px solid #00ffb4",
    color: hov ? "#000" : "#00ffb4",
    padding: "8px 20px",
    cursor: "pointer",
    fontFamily: "'Space Mono',monospace",
    fontSize: 12,
    letterSpacing: 2,
    textTransform: "uppercase",
    transition: "all 0.2s",
    whiteSpace: "nowrap",
  };
  return (
    <button
      style={style}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={openBrief}
    >
      {children}
    </button>
  );
}
