import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NAV_LINKS, scrollTo } from "../../constants/layout";

function NavBtnInner({ children, onClick, href, isActive, isHome }) {
  const [hov, setHov] = useState(false);
  const color = hov || isActive ? "#00ffb4" : "rgba(255,255,255,0.6)";
  const style = {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Space Mono',monospace",
    fontSize: 12,
    color,
    letterSpacing: 2,
    textTransform: "uppercase",
    transition: "color 0.2s",
    textDecoration: "none",
    padding: 0,
  };
  const handleClick = (e) => {
    if (isHome && href?.startsWith("/#") && onClick) {
      e.preventDefault();
      onClick();
    }
  };
  const content = href ? (
    <Link to={href} style={style} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={handleClick}>
      {children}
    </Link>
  ) : (
    <button style={style} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)} onClick={onClick}>
      {children}
    </button>
  );
  return content;
}

export function NavBtn({ children, onClick, href }) {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const link = NAV_LINKS.find((l) => l.label === children);
  const isActive = link && isHome && location.hash === `#${link.hash}`;
  return (
    <NavBtnInner href={href} onClick={onClick} isActive={!!isActive} isHome={isHome}>
      {children}
    </NavBtnInner>
  );
}

export function NavLinks() {
  const handleNav = (link) => {
    if (link.hash) scrollTo(link.hash);
  };
  return (
    <>
      {NAV_LINKS.map((link) => (
        <NavBtn key={link.label} href={link.path} onClick={() => handleNav(link)}>
          {link.label}
        </NavBtn>
      ))}
    </>
  );
}
