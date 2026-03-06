import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { scrollTo } from "../../constants/layout";

export function TalkBtn({ children }) {
  const [hov, setHov] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
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
    textDecoration: "none",
  };
  const handleClick = (e) => {
    if (isHome) {
      e.preventDefault();
      scrollTo("contact");
    }
  };
  return (
    <Link
      to="/#contact"
      style={style}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
