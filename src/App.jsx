import { useState, useEffect } from "react";

/* ─── Data ─────────────────────────────────────────────────────────────── */
const NAV_LINKS = ["Services", "About", "Clients", "Contact"];

const SERVICES = [
  { icon: "◈", title: "Web Development",   desc: "Lightning-fast, scalable web apps engineered for growth. From MVPs to enterprise platforms — shipped in days." },
  { icon: "◉", title: "App Development",   desc: "Native and cross-platform mobile apps built with precision. Your idea, live on every device, faster than you think." },
  { icon: "⬡", title: "AI Integration",    desc: "Embed intelligence into your product. LLMs, automation, smart workflows — we make AI work for your business." },
  { icon: "◫", title: "Data Engineering",  desc: "Robust pipelines, clean architecture, and real-time data flows that your team can actually rely on." },
  { icon: "◳", title: "Power BI Platform", desc: "Turn raw data into decisions. We build Power BI dashboards that executives actually open and trust." },
];

const CLIENTS = [
  { name: "Pronex",            url: "https://www.pronex-ks.com",       tag: "Kosovo" },
  { name: "Lial HC",           url: "https://www.lialhc.com",          tag: "Healthcare" },
  { name: "Gazi",              url: "https://www.gazi-ks.com",         tag: "Kosovo" },
  { name: "Elia Partnerships", url: "https://www.elia-partnerships.com", tag: "Consulting" },
];

const PROCESS = [
  { num: "01", title: "Understand",     body: "We sit with you. Learn your world, your users, your constraints. No templates — just listening." },
  { num: "02", title: "Pitch & Shape",  body: "We help you articulate the vision. Decks, prototypes, and arguments that win stakeholders." },
  { num: "03", title: "Build Fast",     body: "AI-accelerated development. MVP in days. Iterate in hours. Ship before the competition blinks." },
  { num: "04", title: "Scale Together", body: "We don't disappear post-launch. We're your technical co-pilots, long after the first deploy." },
];

/* ─── Hooks ─────────────────────────────────────────────────────────────── */
function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    let ticking = false;
    const handler = () => {
      if (!ticking) {
        requestAnimationFrame(() => { setY(window.scrollY); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return y;
}

function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== "undefined" && window.innerWidth < 768);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

function useIsSmallScreen() {
  const [small, setSmall] = useState(() => typeof window !== "undefined" && window.innerWidth < 480);
  useEffect(() => {
    const check = () => setSmall(window.innerWidth < 480);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return small;
}

const PAGE_PADDING_X = "clamp(16px, 5vw, 64px)";
const SECTION_PADDING_Y = "clamp(60px, 10vh, 120px)";

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

/* ─── Grid Background ────────────────────────────────────────────────────── */
function GridBackground() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
      backgroundImage: `linear-gradient(rgba(0,255,180,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,255,180,0.04) 1px,transparent 1px)`,
      backgroundSize: "60px 60px",
    }} />
  );
}



/* ─── Shared UI ──────────────────────────────────────────────────────────── */
function SectionLabel({ children }) {
  return (
    <div style={{
      fontFamily: "'Space Mono',monospace", fontSize: 10, letterSpacing: 6,
      color: "#00ffb4", marginBottom: 14, textTransform: "uppercase",
      display: "flex", alignItems: "center", gap: 12,
    }}>
      <span style={{ display: "inline-block", width: 32, height: 1, background: "#00ffb4", flexShrink: 0 }} />
      {children}
    </div>
  );
}

function SectionTitle({ children }) {
  return (
    <h2 style={{
      fontFamily: "'Orbitron',monospace", fontSize: "clamp(30px,5vw,54px)",
      fontWeight: 900, color: "#fff", margin: 0,
    }}>{children}</h2>
  );
}

function ClipBtn({ children, onClick, small }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#fff" : "#00ffb4", border: "none", color: "#000",
        padding: small ? "12px 24px" : "15px 32px", fontFamily: "'Space Mono',monospace",
        fontWeight: 700, fontSize: small ? 11 : 12, letterSpacing: 2, textTransform: "uppercase",
        transition: "background 0.2s", cursor: "pointer",
        clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))",
      }}>{children}</button>
  );
}

function GhostBtn({ children, onClick, small }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: "transparent", cursor: "pointer",
        border: `1px solid ${hov ? "#00ffb4" : "rgba(255,255,255,0.2)"}`,
        color: hov ? "#00ffb4" : "rgba(255,255,255,0.65)",
        padding: small ? "12px 24px" : "15px 32px", fontFamily: "'Space Mono',monospace",
        fontSize: small ? 11 : 12, letterSpacing: 2, textTransform: "uppercase", transition: "all 0.2s",
      }}>{children}</button>
  );
}

/* ─── Navbar ─────────────────────────────────────────────────────────────── */
function Navbar({ scrollY }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const stuck = scrollY > 40;

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      paddingTop: stuck ? 14 : 22,
      paddingBottom: stuck ? 14 : 22,
      paddingLeft: PAGE_PADDING_X,
      paddingRight: PAGE_PADDING_X,
      background: stuck || menuOpen ? "rgba(5,8,14,0.96)" : "transparent",
      backdropFilter: stuck || menuOpen ? "blur(14px)" : "none",
      borderBottom: stuck ? "1px solid rgba(0,255,180,0.1)" : "none",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "padding 0.3s, background 0.3s",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", minWidth: 0 }} onClick={() => scrollTo("hero")}>
        <div style={{ width: 28, height: 28, border: "2px solid #00ffb4", transform: "rotate(45deg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ width: 9, height: 9, background: "#00ffb4", transform: "rotate(-45deg)" }} />
        </div>
        <span style={{ fontFamily: "'Orbitron',monospace", fontWeight: 700, fontSize: "clamp(14px, 3.5vw, 18px)", color: "#fff", letterSpacing: 2 }}>TREFORGE</span>
      </div>

      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {NAV_LINKS.map(l => <NavBtn key={l} onClick={() => scrollTo(l.toLowerCase())}>{l}</NavBtn>)}
          <TalkBtn onClick={() => scrollTo("contact")}>Let's Talk</TalkBtn>
        </div>
      )}

      {isMobile && (
        <button onClick={() => setMenuOpen(o => !o)} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 4 }}>
          {[0,1,2].map(i => (
            <span key={i} style={{
              display: "block", width: 24, height: 2,
              background: menuOpen && i === 1 ? "transparent" : "#00ffb4",
              transition: "all 0.3s",
              transform: menuOpen ? (i === 0 ? "rotate(45deg) translate(5px,5px)" : i === 2 ? "rotate(-45deg) translate(5px,-5px)" : "none") : "none",
            }} />
          ))}
        </button>
      )}

      {isMobile && menuOpen && (
        <div style={{
          position: "absolute", top: "100%", left: 0, right: 0,
          background: "rgba(5,8,14,0.98)", borderBottom: "1px solid rgba(0,255,180,0.15)",
          padding: "24px 16px", paddingLeft: PAGE_PADDING_X, paddingRight: PAGE_PADDING_X,
          display: "flex", flexDirection: "column", gap: 20,
        }}>
          {NAV_LINKS.map(l => (
            <button key={l} onClick={() => { scrollTo(l.toLowerCase()); setMenuOpen(false); }}
              style={{
                background: "none", border: "none", cursor: "pointer", textAlign: "left",
                fontFamily: "'Space Mono',monospace", fontSize: 14, color: "rgba(255,255,255,0.7)",
                letterSpacing: 3, textTransform: "uppercase", padding: "8px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
              }}>{l}</button>
          ))}
          <TalkBtn onClick={() => { scrollTo("contact"); setMenuOpen(false); }}>Let's Talk</TalkBtn>
        </div>
      )}
    </nav>
  );
}

function NavBtn({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: "none", border: "none", cursor: "pointer",
        fontFamily: "'Space Mono',monospace", fontSize: 12,
        color: hov ? "#00ffb4" : "rgba(255,255,255,0.6)",
        letterSpacing: 2, textTransform: "uppercase", transition: "color 0.2s",
      }}>{children}</button>
  );
}

function TalkBtn({ children, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#00ffb4" : "transparent", border: "1.5px solid #00ffb4",
        color: hov ? "#000" : "#00ffb4", padding: "8px 20px", cursor: "pointer",
        fontFamily: "'Space Mono',monospace", fontSize: 12,
        letterSpacing: 2, textTransform: "uppercase", transition: "all 0.2s", whiteSpace: "nowrap",
      }}>{children}</button>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────────────── */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const HERO_WORD = "DRIVEN BY AI";

function Hero() {
  const [revealed, setRevealed] = useState(0);
  const [done, setDone] = useState(false);
  const [, forceUpdate] = useState(0);
  const isMobile = useIsMobile();
  const isSmall = useIsSmallScreen();

  useEffect(() => {
    const duration = 1800;
    const start = Date.now();
    let raf;
    const tick = () => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      const r = Math.floor(progress * HERO_WORD.length);
      setRevealed(r);
      if (r < HERO_WORD.length) {
        forceUpdate(n => n + 1);
        raf = requestAnimationFrame(tick);
      } else {
        setDone(true);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const display = HERO_WORD.split("").map((c, i) =>
    i < revealed || c === " " ? c : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]
  ).join("");

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "flex-start",
      paddingTop: isMobile ? "clamp(80px, 12vh, 100px)" : 0,
      paddingBottom: isMobile ? 60 : 0,
      paddingLeft: PAGE_PADDING_X,
      paddingRight: PAGE_PADDING_X,
      position: "relative", overflow: "hidden",
    }}>
      {!isMobile && (
        <>
          <div style={{ position: "absolute", right: -120, top: "5%", width: 600, height: 600, border: "1px solid rgba(0,255,180,0.07)", borderRadius: "50%", animation: "spin 40s linear infinite", pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 60, top: "18%", width: 380, height: 380, border: "1px solid rgba(0,255,180,0.1)", borderRadius: "50%", animation: "spin 25s linear infinite reverse", pointerEvents: "none" }} />
          <div style={{ position: "absolute", right: 180, top: "33%", width: 200, height: 200, background: "radial-gradient(circle,rgba(0,255,180,0.05) 0%,transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />
        </>
      )}

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900, width: "100%" }}>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: 5, color: "#00ffb4", marginBottom: 20, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ display: "inline-block", width: 32, height: 1, background: "#00ffb4", flexShrink: 0 }} />
          AI-Native Digital Agency
        </div>

        <h1 style={{
          fontFamily: "'Orbitron',monospace",
          fontSize: isMobile ? "clamp(38px,10vw,60px)" : "clamp(52px,8vw,96px)",
          fontWeight: 900, lineHeight: 1, color: "#fff",
          margin: "0 0 6px", letterSpacing: -1, userSelect: "none",
        }}>{display}</h1>

        <h2 style={{
          fontFamily: "'Orbitron',monospace",
          fontSize: isMobile ? "clamp(16px,5vw,26px)" : "clamp(20px,3vw,42px)",
          fontWeight: 400, lineHeight: 1.2, color: "rgba(255,255,255,0.22)",
          margin: "0 0 28px", letterSpacing: 2,
        }}>MVP WITHIN DAYS<br />NOT WEEKS</h2>

        <p style={{ fontFamily: "'Space Mono',monospace", fontSize: isMobile ? 13 : 15, lineHeight: 1.85, color: "rgba(255,255,255,0.45)", maxWidth: 520, margin: "0 0 44px" }}>
          We don't just build — we think with you. From zero to shipped product, Treforge is your partner in turning bold ideas into real, working solutions.
        </p>

        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <ClipBtn onClick={() => scrollTo("contact")} small={isSmall}>Start Your MVP</ClipBtn>
          <GhostBtn onClick={() => scrollTo("services")} small={isSmall}>Our Services</GhostBtn>
        </div>

        <div style={{ marginTop: isMobile ? 56 : 80, display: "flex", gap: isMobile ? 32 : 56, flexWrap: "wrap" }}>
          {[["4+","Clients Launched"],["5","Service Areas"],["Days","Not Weeks"]].map(([n,l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: isMobile ? 26 : 34, fontWeight: 900, color: "#00ffb4" }}>{n}</div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: 2, textTransform: "uppercase", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Services ───────────────────────────────────────────────────────────── */
function Services() {
  const [active, setActive] = useState(null);
  const isMobile = useIsMobile();
  const isSmall = useIsSmallScreen();
  return (
    <section id="services" style={{ padding: `${SECTION_PADDING_Y} ${PAGE_PADDING_X}` }}>
      <SectionLabel>What We Do</SectionLabel>
      <SectionTitle>SERVICES</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit,minmax(280px,1fr))", gap: 2, marginTop: "clamp(32px, 6vw, 56px)" }}>
        {SERVICES.map((s, i) => (
          <div key={i} data-hover
            onMouseEnter={() => setActive(i)} onMouseLeave={() => setActive(null)}
            style={{
              padding: isSmall ? "28px 24px" : "40px 36px",
              background: active === i ? "rgba(0,255,180,0.04)" : "rgba(255,255,255,0.02)",
              border: `1px solid ${active === i ? "rgba(0,255,180,0.28)" : "rgba(255,255,255,0.06)"}`,
              transition: "all 0.25s", position: "relative", overflow: "hidden",
            }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: active === i ? "linear-gradient(90deg,#00ffb4,transparent)" : "transparent", transition: "background 0.25s" }} />
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 32, color: "#00ffb4", marginBottom: 22, transition: "transform 0.25s", transform: active === i ? "scale(1.12)" : "scale(1)", display: "inline-block" }}>{s.icon}</div>
            <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 14px", letterSpacing: 1 }}>{s.title}</h3>
            <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.48)", lineHeight: 1.85, margin: 0 }}>{s.desc}</p>
            <div style={{ marginTop: 28, fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#00ffb4", letterSpacing: 3, opacity: active === i ? 1 : 0, transition: "opacity 0.25s" }}>EXPLORE →</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── About ──────────────────────────────────────────────────────────────── */
function About() {
  const isMobile = useIsMobile();
  return (
    <section id="about" style={{ padding: `${SECTION_PADDING_Y} ${PAGE_PADDING_X}` }}>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? "clamp(32px, 6vw, 48px)" : 80, alignItems: "start" }}>
        <div>
          <SectionLabel>How We Work</SectionLabel>
          <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: isMobile ? "clamp(26px,7vw,40px)" : "clamp(28px,3.5vw,48px)", fontWeight: 900, color: "#fff", margin: "0 0 24px" }}>WE THINK<br />BEFORE WE BUILD</h2>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, color: "rgba(255,255,255,0.48)", lineHeight: 1.9, margin: "0 0 18px" }}>
            Most agencies take your brief and disappear into a room. We don't. We sit at the table with you — challenging assumptions, sharpening the idea, and making sure what we build actually solves the problem.
          </p>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, color: "rgba(255,255,255,0.48)", lineHeight: 1.9, margin: 0 }}>
            Whether you're pitching to investors or solving an internal bottleneck, Treforge brings technical depth and strategic clarity to every engagement.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {PROCESS.map((p, i) => <ProcessCard key={i} {...p} />)}
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ num, title, body }) {
  const [hov, setHov] = useState(false);
  const isSmall = useIsSmallScreen();
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", gap: isSmall ? 16 : 22, padding: isSmall ? "20px 20px" : "26px 28px",
        background: hov ? "rgba(0,255,180,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hov ? "rgba(0,255,180,0.2)" : "rgba(255,255,255,0.06)"}`,
        transition: "all 0.2s",
      }}>
      <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 12, color: "#00ffb4", opacity: 0.55, minWidth: 30, fontWeight: 700, paddingTop: 2 }}>{num}</div>
      <div>
        <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 8 }}>{title}</div>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.42)", lineHeight: 1.75 }}>{body}</div>
      </div>
    </div>
  );
}

/* ─── Clients ────────────────────────────────────────────────────────────── */
function Clients() {
  const isMobile = useIsMobile();
  return (
    <section id="clients" style={{ padding: `${SECTION_PADDING_Y} ${PAGE_PADDING_X}` }}>
      <SectionLabel>Who We've Helped</SectionLabel>
      <SectionTitle>CLIENTS</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(auto-fit, minmax(200px, 1fr))" : "repeat(4,1fr)", gap: 2, marginTop: "clamp(32px, 6vw, 56px)" }}>
        {CLIENTS.map((c, i) => <ClientCard key={i} {...c} />)}
      </div>
      <div style={{
        marginTop: "clamp(40px, 8vw, 64px)", padding: "clamp(32px, 5vw, 60px) clamp(24px, 4vw, 52px)",
        background: "linear-gradient(135deg,rgba(0,255,180,0.06),rgba(0,255,180,0.02))",
        border: "1px solid rgba(0,255,180,0.14)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        flexWrap: "wrap", gap: 28,
      }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(18px, 4vw, 36px)", fontWeight: 900, color: "#fff", marginBottom: 10 }}>READY TO BUILD<br />SOMETHING REAL?</div>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, color: "rgba(255,255,255,0.45)" }}>Let's talk about your idea. No fluff, just solutions.</div>
        </div>
        <ClipBtn onClick={() => scrollTo("contact")}>Get In Touch</ClipBtn>
      </div>
    </section>
  );
}

function ClientCard({ name, url, tag }) {
  const [hov, setHov] = useState(false);
  const isSmall = useIsSmallScreen();
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" data-hover
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: "block", padding: isSmall ? "28px 20px" : "36px 28px",
        background: hov ? "rgba(0,255,180,0.05)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hov ? "rgba(0,255,180,0.28)" : "rgba(255,255,255,0.06)"}`,
        textDecoration: "none", transition: "all 0.25s", position: "relative",
      }}>
      <div style={{ position: "absolute", top: 16, right: 16, width: 7, height: 7, borderRadius: "50%", background: "#00ffb4", opacity: hov ? 1 : 0.4, transition: "opacity 0.25s" }} />
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 9, color: "#00ffb4", letterSpacing: 4, textTransform: "uppercase", marginBottom: 12, opacity: 0.7 }}>{tag}</div>
      <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 16 }}>{name}</div>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: hov ? "#00ffb4" : "rgba(0,255,180,0.4)", letterSpacing: 2, transition: "color 0.2s" }}>↗ VISIT</div>
    </a>
  );
}

/* ─── Contact ────────────────────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const isMobile = useIsMobile();
  const isSmall = useIsSmallScreen();

  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = () => {
    if (!form.name || !form.email || !form.message) { setError("Please fill in all fields."); return; }
    setError(""); setSent(true);
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff", padding: "15px 18px", fontFamily: "'Space Mono',monospace", fontSize: 13,
    outline: "none", width: "100%", boxSizing: "border-box", transition: "border-color 0.2s",
  };

  return (
    <section id="contact" style={{ padding: `${SECTION_PADDING_Y} ${PAGE_PADDING_X} clamp(48px, 8vw, 60px)` }}>
      <div style={{ maxWidth: 680, margin: "0 auto", width: "100%" }}>
        <div style={{ marginBottom: 52, textAlign: "center" }}>
          <SectionLabel>Start a Project</SectionLabel>
          <h2 style={{ fontFamily: "'Orbitron',monospace", fontSize: isMobile ? "clamp(28px,8vw,48px)" : "clamp(32px,5vw,56px)", fontWeight: 900, color: "#fff", margin: "0 0 14px" }}>LET'S TALK</h2>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, color: "rgba(255,255,255,0.38)", lineHeight: 1.8 }}>Tell us about your idea. We'll respond within 24 hours.</p>
        </div>

        {sent ? (
          <div style={{ textAlign: "center", padding: "clamp(48px, 10vw, 72px) clamp(24px, 5vw, 40px)", border: "1px solid rgba(0,255,180,0.28)", background: "rgba(0,255,180,0.04)" }}>
            <div style={{ fontSize: 36, marginBottom: 18, color: "#00ffb4" }}>⬡</div>
            <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(16px, 4vw, 20px)", color: "#00ffb4", marginBottom: 12 }}>MESSAGE RECEIVED</div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, color: "rgba(255,255,255,0.45)" }}>We'll be in touch within 24 hours.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 2 }}>
              <input placeholder="Your Name" value={form.name} onChange={handle("name")} style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(0,255,180,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
              <input placeholder="Email Address" value={form.email} onChange={handle("email")} type="email" style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(0,255,180,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
            </div>
            <textarea placeholder="Tell us about your project..." value={form.message} onChange={handle("message")} rows={6}
              style={{ ...inputStyle, resize: "vertical" }}
              onFocus={e => e.target.style.borderColor = "rgba(0,255,180,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"} />
            {error && <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#ff4d6d", letterSpacing: 1, padding: "4px 2px" }}>{error}</div>}
            <ClipBtn onClick={submit} small={isSmall}>SEND MESSAGE →</ClipBtn>
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── Footer ─────────────────────────────────────────────────────────────── */
function Footer() {
  const isMobile = useIsMobile();
  return (
    <footer style={{
      padding: `clamp(24px, 4vw, 40px) ${PAGE_PADDING_X}`,
      borderTop: "1px solid rgba(255,255,255,0.06)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 16,
      flexDirection: isMobile ? "column" : "row",
      textAlign: isMobile ? "center" : "left",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: isMobile ? "center" : "flex-start" }}>
        <div style={{ width: 22, height: 22, border: "1.5px solid rgba(0,255,180,0.5)", transform: "rotate(45deg)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <div style={{ width: 6, height: 6, background: "rgba(0,255,180,0.6)", transform: "rotate(-45deg)" }} />
        </div>
        <span style={{ fontFamily: "'Orbitron',monospace", fontWeight: 700, fontSize: 13, color: "rgba(255,255,255,0.45)", letterSpacing: 2 }}>TREFORGE</span>
      </div>
      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.22)", letterSpacing: 2 }}>© 2025 TREFORGE. DRIVEN BY AI.</div>
    </footer>
  );
}

/* ─── Root ───────────────────────────────────────────────────────────────── */
export default function App() {
  const scrollY = useScrollY();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; -webkit-text-size-adjust: 100%; }
        body { background: #05080e; color: #fff; overflow-x: hidden; min-width: 280px; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #05080e; }
        ::-webkit-scrollbar-thumb { background: rgba(0,255,180,0.3); border-radius: 2px; }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        ::placeholder { color: rgba(255,255,255,0.2); }
        input, textarea { color-scheme: dark; }
        @media (max-width: 480px) {
          button { min-height: 44px; }
        }
      `}</style>

      <GridBackground />
      <Navbar scrollY={scrollY} />
      <main style={{ position: "relative", zIndex: 1 }}>
        <Hero />
        <Services />
        <About />
        <Clients />
        <Contact />
      </main>
      <Footer />
    </>
  );
}