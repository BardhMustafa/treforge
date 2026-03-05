import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Services", "About", "Clients", "Contact"];

const SERVICES = [
  {
    icon: "◈",
    title: "Web Development",
    desc: "Lightning-fast, scalable web apps engineered for growth. From MVPs to enterprise platforms — shipped in days.",
  },
  {
    icon: "◉",
    title: "App Development",
    desc: "Native and cross-platform mobile apps built with precision. Your idea, live on every device, faster than you think.",
  },
  {
    icon: "⬡",
    title: "AI Integration",
    desc: "Embed intelligence into your product. LLMs, automation, smart workflows — we make AI work for your business.",
  },
  {
    icon: "◫",
    title: "Data Engineering",
    desc: "Robust pipelines, clean architecture, and real-time data flows that your team can actually rely on.",
  },
  {
    icon: "◳",
    title: "Power BI Platform",
    desc: "Turn raw data into decisions. We build Power BI dashboards that executives actually open and trust.",
  },
];

const CLIENTS = [
  { name: "Pronex", url: "https://www.pronex-ks.com", tag: "Kosovo" },
  { name: "Lial HC", url: "https://www.lialhc.com", tag: "Healthcare" },
  { name: "Gazi", url: "https://www.gazi-ks.com", tag: "Kosovo" },
  { name: "Elia Partnerships", url: "https://www.elia-partnerships.com", tag: "Consulting" },
];

const PROCESS = [
  { num: "01", title: "Understand", body: "We sit with you. Learn your world, your users, your constraints. No templates — just listening." },
  { num: "02", title: "Pitch & Shape", body: "We help you articulate the vision. Decks, prototypes, and arguments that win stakeholders." },
  { num: "03", title: "Build Fast", body: "AI-accelerated development. MVP in days. Iterate in hours. Ship before the competition blinks." },
  { num: "04", title: "Scale Together", body: "We don't disappear post-launch. We're your technical co-pilots, long after the first deploy." },
];

function useScrollY() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const handler = () => setY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return y;
}

function GridBackground() {
  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
      backgroundImage: `
        linear-gradient(rgba(0,255,180,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,180,0.04) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
    }} />
  );
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hov, setHov] = useState(false);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => setHov(e.target.closest("a,button,[data-hover]") !== null);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);
  return (
    <div style={{
      position: "fixed", zIndex: 9999, pointerEvents: "none",
      left: pos.x, top: pos.y,
      transform: "translate(-50%,-50%)",
      transition: "width 0.2s, height 0.2s, background 0.2s",
      width: hov ? 40 : 12, height: hov ? 40 : 12,
      borderRadius: "50%",
      background: hov ? "rgba(0,255,180,0.15)" : "rgba(0,255,180,0.9)",
      border: hov ? "1.5px solid rgba(0,255,180,0.8)" : "none",
      mixBlendMode: "screen",
    }} />
  );
}

function Navbar({ scrollY }) {
  const [open, setOpen] = useState(false);
  const stuck = scrollY > 40;
  const scroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: stuck ? "14px 48px" : "24px 48px",
      background: stuck ? "rgba(5,8,14,0.92)" : "transparent",
      backdropFilter: stuck ? "blur(12px)" : "none",
      borderBottom: stuck ? "1px solid rgba(0,255,180,0.1)" : "none",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      transition: "all 0.3s ease",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 32, height: 32, border: "2px solid #00ffb4",
          transform: "rotate(45deg)", position: "relative",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: 10, height: 10, background: "#00ffb4", transform: "rotate(-45deg)" }} />
        </div>
        <span style={{ fontFamily: "'Orbitron', monospace", fontWeight: 700, fontSize: 20, color: "#fff", letterSpacing: 2 }}>
          TREFORGE
        </span>
      </div>
      <div style={{ display: "flex", gap: 40 }}>
        {NAV_LINKS.map(l => (
          <button key={l} onClick={() => scroll(l.toLowerCase())}
            style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "'Space Mono', monospace", fontSize: 13, color: "rgba(255,255,255,0.6)",
              letterSpacing: 2, textTransform: "uppercase",
              transition: "color 0.2s",
            }}
            onMouseEnter={e => e.target.style.color = "#00ffb4"}
            onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.6)"}
          >{l}</button>
        ))}
        <button onClick={() => scroll("contact")}
          style={{
            background: "transparent", border: "1.5px solid #00ffb4",
            color: "#00ffb4", padding: "8px 20px", cursor: "pointer",
            fontFamily: "'Space Mono', monospace", fontSize: 12, letterSpacing: 2,
            textTransform: "uppercase", transition: "all 0.2s",
          }}
          onMouseEnter={e => { e.target.style.background = "#00ffb4"; e.target.style.color = "#000"; }}
          onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#00ffb4"; }}
        >Let's Talk</button>
      </div>
    </nav>
  );
}

function Hero() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick(p => p + 1), 80);
    return () => clearInterval(t);
  }, []);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const scramble = (text, revealed) =>
    text.split("").map((c, i) =>
      i < revealed ? c : c === " " ? " " : chars[Math.floor(Math.random() * chars.length)]
    ).join("");

  const word = "DRIVEN BY AI";
  const revealed = Math.min(tick * 0.6, word.length);

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "flex-start",
      padding: "0 48px", position: "relative", overflow: "hidden",
    }}>
      {/* Decorative elements */}
      <div style={{
        position: "absolute", right: -100, top: "10%",
        width: 600, height: 600,
        border: "1px solid rgba(0,255,180,0.08)",
        borderRadius: "50%", animation: "spin 30s linear infinite",
      }} />
      <div style={{
        position: "absolute", right: 80, top: "20%",
        width: 400, height: 400,
        border: "1px solid rgba(0,255,180,0.12)",
        borderRadius: "50%", animation: "spin 20s linear infinite reverse",
      }} />
      <div style={{
        position: "absolute", right: 200, top: "35%",
        width: 200, height: 200,
        background: "radial-gradient(circle, rgba(0,255,180,0.06) 0%, transparent 70%)",
        borderRadius: "50%",
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 900 }}>
        <div style={{
          fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 6,
          color: "#00ffb4", marginBottom: 24, textTransform: "uppercase",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <span style={{ display: "inline-block", width: 40, height: 1, background: "#00ffb4" }} />
          AI-Native Digital Agency
        </div>

        <h1 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "clamp(52px, 8vw, 100px)",
          fontWeight: 900, lineHeight: 1,
          color: "#fff", margin: "0 0 8px",
          letterSpacing: -1,
        }}>
          {scramble(word, Math.floor(revealed))}
        </h1>

        <h2 style={{
          fontFamily: "'Orbitron', monospace",
          fontSize: "clamp(28px, 4vw, 52px)",
          fontWeight: 400, lineHeight: 1.2,
          color: "rgba(255,255,255,0.25)",
          margin: "0 0 32px", letterSpacing: 2,
        }}>
          MVP WITHIN DAYS<br />NOT WEEKS
        </h2>

        <p style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 15, lineHeight: 1.8,
          color: "rgba(255,255,255,0.5)",
          maxWidth: 560, margin: "0 0 48px",
        }}>
          We don't just build — we think with you. From zero to shipped product,
          Treforge is your partner in turning bold ideas into real, working solutions.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "#00ffb4", border: "none", color: "#000",
              padding: "16px 36px", cursor: "pointer",
              fontFamily: "'Space Mono', monospace", fontWeight: 700,
              fontSize: 13, letterSpacing: 2, textTransform: "uppercase",
              transition: "all 0.2s", clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
            }}
            onMouseEnter={e => { e.target.style.background = "#fff"; }}
            onMouseLeave={e => { e.target.style.background = "#00ffb4"; }}
          >Start Your MVP</button>
          <button
            onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "transparent", border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.7)", padding: "16px 36px", cursor: "pointer",
              fontFamily: "'Space Mono', monospace", fontSize: 13,
              letterSpacing: 2, textTransform: "uppercase", transition: "all 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#00ffb4"; e.currentTarget.style.color = "#00ffb4"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
          >Our Services</button>
        </div>

        <div style={{ marginTop: 80, display: "flex", gap: 48 }}>
          {[["4+", "Clients Launched"], ["5", "Service Areas"], ["Days", "Not Weeks"]].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "'Orbitron', monospace", fontSize: 32, fontWeight: 900, color: "#00ffb4" }}>{n}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 2, textTransform: "uppercase" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [active, setActive] = useState(null);
  return (
    <section id="services" style={{ padding: "120px 48px", position: "relative" }}>
      <div style={{
        position: "absolute", left: -200, top: "30%",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(0,255,180,0.04) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 72 }}>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 6,
            color: "#00ffb4", marginBottom: 16, textTransform: "uppercase",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ display: "inline-block", width: 40, height: 1, background: "#00ffb4" }} />
            What We Do
          </div>
          <h2 style={{
            fontFamily: "'Orbitron', monospace", fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 900, color: "#fff", margin: 0,
          }}>SERVICES</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 2 }}>
          {SERVICES.map((s, i) => (
            <div key={i}
              data-hover
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                padding: "48px 40px",
                background: active === i ? "rgba(0,255,180,0.04)" : "rgba(255,255,255,0.02)",
                border: `1px solid ${active === i ? "rgba(0,255,180,0.3)" : "rgba(255,255,255,0.06)"}`,
                cursor: "default", transition: "all 0.3s ease",
                position: "relative", overflow: "hidden",
              }}>
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 2,
                background: active === i ? "linear-gradient(90deg, #00ffb4, transparent)" : "transparent",
                transition: "background 0.3s",
              }} />
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 36, color: "#00ffb4",
                marginBottom: 24, display: "block",
                transition: "transform 0.3s",
                transform: active === i ? "scale(1.1)" : "scale(1)",
              }}>{s.icon}</div>
              <h3 style={{
                fontFamily: "'Orbitron', monospace", fontSize: 16,
                fontWeight: 700, color: "#fff",
                margin: "0 0 16px", letterSpacing: 1,
              }}>{s.title}</h3>
              <p style={{
                fontFamily: "'Space Mono', monospace", fontSize: 13,
                color: "rgba(255,255,255,0.5)", lineHeight: 1.8, margin: 0,
              }}>{s.desc}</p>
              <div style={{
                marginTop: 32, fontFamily: "'Space Mono', monospace",
                fontSize: 11, color: "#00ffb4", letterSpacing: 3,
                opacity: active === i ? 1 : 0, transition: "opacity 0.3s",
              }}>EXPLORE →</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "120px 48px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 6,
            color: "#00ffb4", marginBottom: 16, textTransform: "uppercase",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ display: "inline-block", width: 40, height: 1, background: "#00ffb4" }} />
            How We Work
          </div>
          <h2 style={{
            fontFamily: "'Orbitron', monospace", fontSize: "clamp(28px, 4vw, 48px)",
            fontWeight: 900, color: "#fff", margin: "0 0 24px",
          }}>WE THINK<br />BEFORE WE BUILD</h2>
          <p style={{
            fontFamily: "'Space Mono', monospace", fontSize: 14,
            color: "rgba(255,255,255,0.5)", lineHeight: 1.9, margin: "0 0 20px",
          }}>
            Most agencies take your brief and disappear into a room. We don't.
            We sit at the table with you — challenging assumptions, sharpening the idea,
            and making sure what we build actually solves the problem.
          </p>
          <p style={{
            fontFamily: "'Space Mono', monospace", fontSize: 14,
            color: "rgba(255,255,255,0.5)", lineHeight: 1.9, margin: 0,
          }}>
            Whether you're pitching to investors or solving an internal bottleneck,
            Treforge brings technical depth and strategic clarity to every engagement.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {PROCESS.map((p, i) => (
            <div key={i} style={{
              display: "flex", gap: 24, padding: "28px 32px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(0,255,180,0.04)"; e.currentTarget.style.borderColor = "rgba(0,255,180,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
            >
              <div style={{
                fontFamily: "'Orbitron', monospace", fontSize: 13,
                color: "#00ffb4", opacity: 0.6, minWidth: 32,
                fontWeight: 700,
              }}>{p.num}</div>
              <div>
                <div style={{
                  fontFamily: "'Orbitron', monospace", fontSize: 14,
                  fontWeight: 700, color: "#fff", marginBottom: 8,
                }}>{p.title}</div>
                <div style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 12,
                  color: "rgba(255,255,255,0.45)", lineHeight: 1.7,
                }}>{p.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Clients() {
  return (
    <section id="clients" style={{ padding: "120px 48px", position: "relative" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 72 }}>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 6,
            color: "#00ffb4", marginBottom: 16, textTransform: "uppercase",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ display: "inline-block", width: 40, height: 1, background: "#00ffb4" }} />
            Who We've Helped
          </div>
          <h2 style={{
            fontFamily: "'Orbitron', monospace", fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 900, color: "#fff", margin: 0,
          }}>CLIENTS</h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 2 }}>
          {CLIENTS.map((c, i) => (
            <a key={i} href={c.url} target="_blank" rel="noopener noreferrer"
              data-hover
              style={{
                display: "block", padding: "48px 40px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none", transition: "all 0.3s",
                position: "relative", overflow: "hidden",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(0,255,180,0.05)";
                e.currentTarget.style.borderColor = "rgba(0,255,180,0.3)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              <div style={{
                position: "absolute", top: 20, right: 20,
                width: 8, height: 8, borderRadius: "50%",
                background: "#00ffb4", opacity: 0.6,
              }} />
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: 10,
                color: "#00ffb4", letterSpacing: 4, textTransform: "uppercase",
                marginBottom: 16, opacity: 0.7,
              }}>{c.tag}</div>
              <div style={{
                fontFamily: "'Orbitron', monospace", fontSize: 22,
                fontWeight: 700, color: "#fff", marginBottom: 16,
              }}>{c.name}</div>
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: 11,
                color: "rgba(0,255,180,0.6)", letterSpacing: 2,
              }}>↗ VISIT SITE</div>
            </a>
          ))}
        </div>

        <div style={{
          marginTop: 80, padding: "60px 48px",
          background: "linear-gradient(135deg, rgba(0,255,180,0.06) 0%, rgba(0,255,180,0.02) 100%)",
          border: "1px solid rgba(0,255,180,0.15)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: 32,
        }}>
          <div>
            <div style={{
              fontFamily: "'Orbitron', monospace", fontSize: "clamp(24px, 4vw, 40px)",
              fontWeight: 900, color: "#fff", marginBottom: 12,
            }}>READY TO BUILD<br />SOMETHING REAL?</div>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 13,
              color: "rgba(255,255,255,0.5)",
            }}>Let's talk about your idea. No fluff, just solutions.</div>
          </div>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "#00ffb4", border: "none", color: "#000",
              padding: "18px 44px", cursor: "pointer",
              fontFamily: "'Space Mono', monospace", fontWeight: 700,
              fontSize: 13, letterSpacing: 2, textTransform: "uppercase",
              clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              transition: "background 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { e.target.style.background = "#fff"; }}
            onMouseLeave={e => { e.target.style.background = "#00ffb4"; }}
          >Get In Touch</button>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));
  const submit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff", padding: "16px 20px",
    fontFamily: "'Space Mono', monospace", fontSize: 13,
    outline: "none", width: "100%", boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <section id="contact" style={{ padding: "120px 48px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <div style={{ marginBottom: 56, textAlign: "center" }}>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: 11, letterSpacing: 6,
            color: "#00ffb4", marginBottom: 16, textTransform: "uppercase",
          }}>Start a Project</div>
          <h2 style={{
            fontFamily: "'Orbitron', monospace", fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 900, color: "#fff", margin: "0 0 16px",
          }}>LET'S TALK</h2>
          <p style={{
            fontFamily: "'Space Mono', monospace", fontSize: 13,
            color: "rgba(255,255,255,0.4)", lineHeight: 1.8,
          }}>Tell us about your idea. We'll respond within 24 hours.</p>
        </div>

        {sent ? (
          <div style={{
            textAlign: "center", padding: "80px 40px",
            border: "1px solid rgba(0,255,180,0.3)",
            background: "rgba(0,255,180,0.04)",
          }}>
            <div style={{ fontSize: 40, marginBottom: 20 }}>⬡</div>
            <div style={{
              fontFamily: "'Orbitron', monospace", fontSize: 22,
              color: "#00ffb4", marginBottom: 12,
            }}>MESSAGE RECEIVED</div>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 13,
              color: "rgba(255,255,255,0.5)",
            }}>We'll be in touch within 24 hours.</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
              <input placeholder="Your Name" value={form.name} onChange={handle("name")}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(0,255,180,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
              <input placeholder="Email Address" value={form.email} onChange={handle("email")}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "rgba(0,255,180,0.5)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
              />
            </div>
            <textarea placeholder="Tell us about your project..." value={form.message} onChange={handle("message")}
              rows={6}
              style={{ ...inputStyle, resize: "vertical" }}
              onFocus={e => e.target.style.borderColor = "rgba(0,255,180,0.5)"}
              onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
            />
            <button onClick={submit}
              style={{
                background: "#00ffb4", border: "none", color: "#000",
                padding: "20px", cursor: "pointer",
                fontFamily: "'Space Mono', monospace", fontWeight: 700,
                fontSize: 13, letterSpacing: 3, textTransform: "uppercase",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => { e.target.style.background = "#fff"; }}
              onMouseLeave={e => { e.target.style.background = "#00ffb4"; }}
            >SEND MESSAGE →</button>
          </div>
        )}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: "48px",
      borderTop: "1px solid rgba(255,255,255,0.06)",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      flexWrap: "wrap", gap: 24,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 24, height: 24, border: "1.5px solid rgba(0,255,180,0.5)",
          transform: "rotate(45deg)", display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{ width: 7, height: 7, background: "rgba(0,255,180,0.6)", transform: "rotate(-45deg)" }} />
        </div>
        <span style={{ fontFamily: "'Orbitron', monospace", fontWeight: 700, fontSize: 14, color: "rgba(255,255,255,0.5)", letterSpacing: 2 }}>
          TREFORGE
        </span>
      </div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: 2 }}>
        © 2025 TREFORGE. DRIVEN BY AI.
      </div>
    </footer>
  );
}

export default function App() {
  const scrollY = useScrollY();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; cursor: none; }
        body { background: #05080e; color: #fff; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #05080e; }
        ::-webkit-scrollbar-thumb { background: rgba(0,255,180,0.3); }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        ::placeholder { color: rgba(255,255,255,0.2); }
        input, textarea { color: #fff !important; }
      `}</style>
      <Cursor />
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
