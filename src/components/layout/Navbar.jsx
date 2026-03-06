import { useState } from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "../../hooks";
import { PAGE_PADDING_X, scrollTo } from "../../constants/layout";
import { NavLinks } from "./NavBtn";
import { TalkBtn } from "./TalkBtn";

export function Navbar({ scrollY }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
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
        <div
          style={{
            width: 28,
            height: 28,
            border: "2px solid #00ffb4",
            transform: "rotate(45deg)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 9,
              height: 9,
              background: "#00ffb4",
              transform: "rotate(-45deg)",
            }}
          />
        </div>
        <span
          style={{
            fontFamily: "'Orbitron',monospace",
            fontWeight: 700,
            fontSize: "clamp(14px, 3.5vw, 18px)",
            color: "#fff",
            letterSpacing: 2,
          }}
        >
          TREFORGE
        </span>
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
          {[
            { label: "Services", path: "/#services", hash: "services" },
            { label: "About", path: "/#about", hash: "about" },
            { label: "Clients", path: "/#clients", hash: "clients" },
            { label: "Contact", path: "/#contact", hash: "contact" },
          ].map((link) => (
            <Link
              key={link.label}
              to={link.path}
              onClick={() => {
                if (window.location.pathname === "/") scrollTo(link.hash);
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
