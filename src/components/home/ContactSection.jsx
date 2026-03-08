import { useState } from "react";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useIsMobile, useIsSmallScreen } from "../../hooks";
import { PAGE_PADDING_X, SECTION_PADDING_Y } from "../../constants/layout";
import { SectionLabel } from "../ui/SectionLabel";
import { ClipBtn } from "../ui/ClipBtn";

export function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const isMobile = useIsMobile();
  const isSmall = useIsSmallScreen();
  const sendContactEmail = useAction(api.contact.sendContactEmail);

  const handle = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setSending(true);
    try {
      await sendContactEmail(form);
      setSent(true);
    } catch (err) {
      setError(err.message || "Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "#fff",
    padding: "15px 18px",
    fontFamily: "'Space Mono',monospace",
    fontSize: 13,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <section
      id="contact"
      style={{
        padding: `${SECTION_PADDING_Y} ${PAGE_PADDING_X} clamp(48px, 8vw, 60px)`,
      }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto", width: "100%" }}>
        <div style={{ marginBottom: 52, textAlign: "center" }}>
          <SectionLabel>Start a Project</SectionLabel>
          <h2
            style={{
              fontFamily: "'Orbitron',monospace",
              fontSize: isMobile ? "clamp(28px,8vw,48px)" : "clamp(32px,5vw,56px)",
              fontWeight: 900,
              color: "#fff",
              margin: "0 0 14px",
            }}
          >
            LET'S TALK
          </h2>
          <p
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: 13,
              color: "rgba(255,255,255,0.38)",
              lineHeight: 1.8,
            }}
          >
            Tell us about your idea. We'll respond within 24 hours.
          </p>
        </div>

        {sent ? (
          <div
            style={{
              textAlign: "center",
              padding:
                "clamp(48px, 10vw, 72px) clamp(24px, 5vw, 40px)",
              border: "1px solid rgba(0,255,180,0.28)",
              background: "rgba(0,255,180,0.04)",
            }}
          >
            <div
              style={{
                fontSize: 36,
                marginBottom: 18,
                color: "#00ffb4",
              }}
            >
              ⬡
            </div>
            <div
              style={{
                fontFamily: "'Orbitron',monospace",
                fontSize: "clamp(16px, 4vw, 20px)",
                color: "#00ffb4",
                marginBottom: 12,
              }}
            >
              MESSAGE RECEIVED
            </div>
            <div
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 13,
                color: "rgba(255,255,255,0.45)",
              }}
            >
              We'll be in touch within 24 hours.
            </div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: 2,
              }}
            >
              <input
                placeholder="Your Name"
                value={form.name}
                onChange={handle("name")}
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(0,255,180,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
              <input
                placeholder="Email Address"
                value={form.email}
                onChange={handle("email")}
                type="email"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = "rgba(0,255,180,0.5)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
              />
            </div>
            <textarea
              placeholder="Tell us about your project..."
              value={form.message}
              onChange={handle("message")}
              rows={6}
              style={{ ...inputStyle, resize: "vertical" }}
              onFocus={(e) => (e.target.style.borderColor = "rgba(0,255,180,0.5)")}
              onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
            />
            {error && (
              <div
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: 11,
                  color: "#ff4d6d",
                  letterSpacing: 1,
                  padding: "4px 2px",
                }}
              >
                {error}
              </div>
            )}
            <ClipBtn onClick={submit} small={isSmall} disabled={sending}>
              {sending ? "SENDING…" : "SEND MESSAGE →"}
            </ClipBtn>
          </div>
        )}
      </div>
    </section>
  );
}
