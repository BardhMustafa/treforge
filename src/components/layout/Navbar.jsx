import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useIsMobile } from "../../hooks";
import { PAGE_PADDING_X, NAV_LINKS, scrollTo } from "../../constants/layout";
import { NavLinks } from "./NavBtn";
import { TalkBtn } from "./TalkBtn";

export function Navbar({ scrollY }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const stuck = scrollY > 40;

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        paddingTop: stuck ? 14 : 22,
        paddingBottom: stuck ? 14 : 22,
        paddingLeft: PAGE_PADDING_X,
        paddingRight: PAGE_PADDING_X,
        background: stuck || menuOpen ? "rgba(5,8,14,0.96)" : "transparent",
        backdropFilter: stuck || menuOpen ? "blur(14px)" : "none",
        borderBottom: stuck ? "1px solid rgba(0,255,180,0.1)" : "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "padding 0.3s, background 0.3s",
      }}
    >
      <Link
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
          minWidth: 0,
          textDecoration: "none",
        }}
        onClick={() => window.location.pathname === "/" && scrollTo("hero")}
      >
        <img
          src="/logo-no-bg.png"
          alt="Treforge"
          style={{ height: 28, width: "auto", display: "block" }}
        />
      </Link>

      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          <NavLinks />
          <TalkBtn>Let's Talk</TalkBtn>
        </div>
      )}

      {isMobile && (
        <button
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            padding: 4,
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: "block",
                width: 24,
                height: 2,
                background: menuOpen && i === 1 ? "transparent" : "#00ffb4",
                transition: "all 0.3s",
                transform: menuOpen
                  ? i === 0
                    ? "rotate(45deg) translate(5px,5px)"
                    : i === 2
                      ? "rotate(-45deg) translate(5px,-5px)"
                      : "none"
                  : "none",
              }}
            />
          ))}
        </button>
      )}

      {isMobile && menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(5,8,14,0.98)",
            borderBottom: "1px solid rgba(0,255,180,0.15)",
            padding: "24px 16px",
            paddingLeft: PAGE_PADDING_X,
            paddingRight: PAGE_PADDING_X,
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={(e) => {
                if (link.hash) {
                  if (window.location.pathname === "/") {
                    e.preventDefault();
                    scrollTo(link.hash);
                  }
                } else {
                  e.preventDefault();
                  navigate(link.path);
                }
                setMenuOpen(false);
              }}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "'Space Mono',monospace",
                fontSize: 14,
                color: "rgba(255,255,255,0.7)",
                letterSpacing: 3,
                textTransform: "uppercase",
                padding: "8px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div onClick={() => setMenuOpen(false)}>
            <TalkBtn>Let's Talk</TalkBtn>
          </div>
        </div>
      )}
    </nav>
  );
}
