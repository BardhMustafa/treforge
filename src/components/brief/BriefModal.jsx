import { useState, useEffect } from "react";
import { useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useBriefModal } from "../../context/BriefModalContext";
import { ClipBtn } from "../ui/ClipBtn";

const STEPS = [
  {
    title: "WHAT ARE YOU BUILDING?",
    subtitle: "Select the type of project",
    type: "select",
    key: "projectType",
    options: ["Website", "Mobile App", "Automation", "AI Tool", "Other"],
  },
  {
    title: "TELL US MORE",
    subtitle: "Describe your idea in a few sentences",
    type: "textarea",
    key: "description",
  },
  {
    title: "BUDGET RANGE",
    subtitle: "Rough estimate helps us scope the work",
    type: "select",
    key: "budget",
    options: ["< $5k", "$5k – $15k", "$15k – $50k", "$50k+"],
  },
  {
    title: "TIMELINE",
    subtitle: "When do you need it?",
    type: "select",
    key: "timeline",
    options: ["ASAP", "1–3 months", "3–6 months", "Flexible"],
  },
  {
    title: "YOUR CONTACT",
    subtitle: "Where should we send our response?",
    type: "contact",
    keys: ["name", "email"],
  },
];

const TOTAL = STEPS.length;

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.85)",
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
};

const cardStyle = {
  background: "#05080e",
  border: "1px solid rgba(255,255,255,0.1)",
  width: "100%",
  maxWidth: 560,
  maxHeight: "90vh",
  overflowY: "auto",
  position: "relative",
};

const inputStyle = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#fff",
  padding: "14px 16px",
  fontFamily: "'Space Mono',monospace",
  fontSize: 13,
  outline: "none",
  width: "100%",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

export function BriefModal() {
  const { open, closeBrief } = useBriefModal();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ projectType: "", description: "", budget: "", timeline: "", name: "", email: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [otherSelected, setOtherSelected] = useState(false);
  const sendContactEmail = useAction(api.contact.sendContactEmail);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") closeBrief(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, closeBrief]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleClose = () => {
    closeBrief();
    setTimeout(() => { setStep(0); setForm({ projectType: "", description: "", budget: "", timeline: "", name: "", email: "" }); setSent(false); setError(""); setOtherSelected(false); }, 200);
  };

  const canAdvance = () => {
    const s = STEPS[step];
    if (s.type === "select") return !!form[s.key];
    if (s.type === "textarea") return form[s.key].trim().length > 0;
    if (s.type === "contact") return form.name.trim() && form.email.trim() && form.email.includes("@");
    return true;
  };

  const handleNext = async () => {
    if (!canAdvance()) { setError("Please complete this step before continuing."); return; }
    setError("");
    if (step < TOTAL - 1) { setStep((s) => s + 1); return; }
    setSending(true);
    try {
      const message = `Project Type: ${form.projectType}\n\nDescription: ${form.description}\n\nBudget: ${form.budget}\n\nTimeline: ${form.timeline}`;
      await sendContactEmail({ name: form.name, email: form.email, message });
      setSent(true);
    } catch (err) {
      setError(err.message || "Failed to send. Please try again.");
    } finally {
      setSending(false);
    }
  };

  if (!open) return null;

  const progress = ((step + 1) / TOTAL) * 100;
  const current = STEPS[step];

  return (
    <div style={overlayStyle} onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
      <div style={cardStyle}>
        {/* Progress bar */}
        <div style={{ height: 3, background: "rgba(255,255,255,0.05)" }}>
          <div style={{ height: "100%", width: `${sent ? 100 : progress}%`, background: "#00ffb4", transition: "width 0.4s ease" }} />
        </div>

        <div style={{ padding: "clamp(28px, 5vw, 44px)" }}>
          {/* Close button */}
          <button
            aria-label="Close"
            onClick={handleClose}
            style={{ position: "absolute", top: 20, right: 20, background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 20, cursor: "pointer", lineHeight: 1, padding: 4 }}
          >
            ✕
          </button>

          {sent ? (
            <div style={{ textAlign: "center", padding: "32px 0" }}>
              <div style={{ fontSize: 36, marginBottom: 18, color: "#00ffb4" }}>⬡</div>
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 20, color: "#00ffb4", marginBottom: 12 }}>BRIEF RECEIVED</div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, color: "rgba(255,255,255,0.45)" }}>
                We'll be in touch within 24 hours.
              </div>
              <button onClick={handleClose} style={{ marginTop: 28, fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", background: "none", border: "none", cursor: "pointer", letterSpacing: 2 }}>
                CLOSE
              </button>
            </div>
          ) : (
            <>
              {/* Step counter */}
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "rgba(255,255,255,0.3)", letterSpacing: 3, marginBottom: 24 }}>
                STEP {step + 1} / {TOTAL}
              </div>

              {/* Step title */}
              <div style={{ fontFamily: "'Orbitron',monospace", fontSize: "clamp(16px, 4vw, 22px)", fontWeight: 700, color: "#fff", marginBottom: 8 }}>
                {current.title}
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.38)", marginBottom: 28 }}>
                {current.subtitle}
              </div>

              {/* Step content */}
              {current.type === "select" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
                    {current.options.map((opt) => {
                      const isOther = opt === "Other";
                      const selected = isOther ? otherSelected : form[current.key] === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => {
                            if (isOther) {
                              setOtherSelected(true);
                              setForm((f) => ({ ...f, [current.key]: "" }));
                            } else {
                              setOtherSelected(false);
                              setForm((f) => ({ ...f, [current.key]: opt }));
                            }
                            setError("");
                          }}
                          style={{
                            padding: "14px 12px",
                            background: selected ? "rgba(0,255,180,0.08)" : "rgba(255,255,255,0.03)",
                            border: `1px solid ${selected ? "rgba(0,255,180,0.5)" : "rgba(255,255,255,0.08)"}`,
                            color: selected ? "#00ffb4" : "rgba(255,255,255,0.6)",
                            fontFamily: "'Space Mono',monospace",
                            fontSize: 11,
                            letterSpacing: 1,
                            cursor: "pointer",
                            transition: "all 0.15s",
                            textAlign: "center",
                          }}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {otherSelected && (
                    <input
                      autoFocus
                      placeholder="Describe your project type..."
                      value={form[current.key]}
                      onChange={(e) => { setForm((f) => ({ ...f, [current.key]: e.target.value })); setError(""); }}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "rgba(0,255,180,0.5)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  )}
                </div>
              )}

              {current.type === "textarea" && (
                <textarea
                  value={form[current.key]}
                  onChange={(e) => setForm((f) => ({ ...f, [current.key]: e.target.value }))}
                  placeholder="e.g. We need a platform where users can book freelancers and pay securely..."
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => (e.target.style.borderColor = "rgba(0,255,180,0.5)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                />
              )}

              {current.type === "contact" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <input
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0,255,180,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                  <input
                    placeholder="Email Address"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "rgba(0,255,180,0.5)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
              )}

              {error && (
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#ff4d6d", letterSpacing: 1, marginTop: 12 }}>
                  {error}
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: "flex", gap: 10, marginTop: 32, justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  {step > 0 && (
                    <button
                      onClick={() => { setStep((s) => s - 1); setError(""); }}
                      style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.4)", background: "none", border: "none", cursor: "pointer", letterSpacing: 2, padding: "8px 0" }}
                    >
                      ← BACK
                    </button>
                  )}
                </div>
                <ClipBtn onClick={handleNext} disabled={sending}>
                  {sending ? "SENDING…" : step < TOTAL - 1 ? "NEXT →" : "SEND BRIEF →"}
                </ClipBtn>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
