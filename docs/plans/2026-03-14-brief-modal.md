# Brief Together Modal Wizard — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the flat ContactSection with a 5-step guided "brief" modal wizard triggered from the navbar, Hero CTA, and service cards.

**Architecture:** A React context (`BriefModalContext`) exposes `openBrief()` globally. A `BriefModal` component renders the centered overlay with a progress bar and step renderer. The existing Convex `sendContactEmail` action is called on the final step. The old `ContactSection` is replaced with a simple one-liner CTA.

**Tech Stack:** React (useState, useContext, useEffect), Convex (`useAction`), existing UI primitives (`ClipBtn`, `GhostBtn`)

---

### Task 1: Create BriefModalContext

**Files:**
- Create: `src/context/BriefModalContext.jsx`
- Modify: `src/App.jsx`

**Step 1: Create the context file**

```jsx
// src/context/BriefModalContext.jsx
import { createContext, useContext, useState } from "react";

const BriefModalContext = createContext(null);

export function BriefModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <BriefModalContext.Provider value={{ open, openBrief: () => setOpen(true), closeBrief: () => setOpen(false) }}>
      {children}
    </BriefModalContext.Provider>
  );
}

export function useBriefModal() {
  return useContext(BriefModalContext);
}
```

**Step 2: Wrap AppInner in App.jsx**

In `src/App.jsx`, import `BriefModalProvider` and wrap the return of `AppInner`:

```jsx
import { BriefModalProvider } from "./context/BriefModalContext";

// Inside AppInner's return, wrap the entire fragment:
return (
  <BriefModalProvider>
    {/* ... existing content ... */}
  </BriefModalProvider>
);
```

**Step 3: Commit**

```bash
git add src/context/BriefModalContext.jsx src/App.jsx
git commit -m "feat: add BriefModalContext provider"
```

---

### Task 2: Build BriefModal component

**Files:**
- Create: `src/components/brief/BriefModal.jsx`

**Step 1: Create the file**

```jsx
// src/components/brief/BriefModal.jsx
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
  const sendContactEmail = useAction(api.contact.sendContactEmail);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleClose = () => {
    closeBrief();
    // Reset after animation
    setTimeout(() => { setStep(0); setForm({ projectType: "", description: "", budget: "", timeline: "", name: "", email: "" }); setSent(false); setError(""); }, 200);
  };

  const canAdvance = () => {
    const s = STEPS[step];
    if (s.type === "select") return !!form[s.key];
    if (s.type === "textarea") return form[s.key].trim().length > 0;
    if (s.type === "contact") return form.name.trim() && form.email.trim();
    return true;
  };

  const handleNext = async () => {
    if (!canAdvance()) { setError("Please complete this step before continuing."); return; }
    setError("");
    if (step < TOTAL - 1) { setStep((s) => s + 1); return; }
    // Final step — submit
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
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 8 }}>
                  {current.options.map((opt) => {
                    const selected = form[current.key] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => { setForm((f) => ({ ...f, [current.key]: opt })); setError(""); }}
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
```

**Step 2: Mount BriefModal in App.jsx**

Inside `AppInner`'s return (inside `BriefModalProvider`), add `<BriefModal />` just before the closing tag:

```jsx
import { BriefModal } from "./components/brief/BriefModal";

// Inside AppInner return, before closing BriefModalProvider:
<BriefModal />
```

**Step 3: Commit**

```bash
git add src/components/brief/BriefModal.jsx src/App.jsx
git commit -m "feat: add BriefModal 5-step wizard component"
```

---

### Task 3: Wire up TalkBtn to open modal

**Files:**
- Modify: `src/components/layout/TalkBtn.jsx`

**Step 1: Replace TalkBtn implementation**

Current `TalkBtn` scrolls to `#contact` or links to `/#contact`. Replace it to call `openBrief()` instead:

```jsx
// src/components/layout/TalkBtn.jsx
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
```

**Step 2: Commit**

```bash
git add src/components/layout/TalkBtn.jsx
git commit -m "feat: wire TalkBtn to open BriefModal"
```

---

### Task 4: Wire up Hero CTA to open modal

**Files:**
- Modify: `src/components/home/Hero.jsx`

**Step 1: Update Hero.jsx**

Import `useBriefModal` and replace `scrollTo("contact")` with `openBrief()`:

```jsx
// Add import at top:
import { useBriefModal } from "../../context/BriefModalContext";

// Inside Hero component:
const { openBrief } = useBriefModal();

// Replace the ClipBtn onClick:
<ClipBtn onClick={openBrief} small={isSmall}>
  Start Your MVP
</ClipBtn>
```

**Step 2: Commit**

```bash
git add src/components/home/Hero.jsx
git commit -m "feat: wire Hero CTA to open BriefModal"
```

---

### Task 5: Add Brief CTA to service cards

**Files:**
- Modify: `src/components/home/ServiceCard.jsx`

**Step 1: Update ServiceCard to accept and call onBrief**

Add a "Brief Us →" button that appears on hover alongside the existing "EXPLORE →" label. The button calls a passed-in `onBrief` prop:

```jsx
// src/components/home/ServiceCard.jsx
import { Link } from "react-router-dom";

export function ServiceCard({ service, active, onMouseEnter, onMouseLeave, isSmall, onBrief }) {
  const { slug, icon, title, desc } = service;
  return (
    <div
      style={{ display: "flex", flexDirection: "column", position: "relative" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        to={`/services/${slug}`}
        style={{ textDecoration: "none", color: "inherit", flex: 1 }}
        data-hover
      >
        <div
          style={{
            padding: isSmall ? "28px 24px" : "40px 36px",
            background: active ? "rgba(0,255,180,0.04)" : "rgba(255,255,255,0.02)",
            border: `1px solid ${active ? "rgba(0,255,180,0.28)" : "rgba(255,255,255,0.06)"}`,
            transition: "all 0.25s",
            position: "relative",
            overflow: "hidden",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0, left: 0, right: 0,
              height: 2,
              background: active ? "linear-gradient(90deg,#00ffb4,transparent)" : "transparent",
              transition: "background 0.25s",
            }}
          />
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 32, color: "#00ffb4", marginBottom: 22, transition: "transform 0.25s", transform: active ? "scale(1.12)" : "scale(1)", display: "inline-block" }}>
            {icon}
          </div>
          <h3 style={{ fontFamily: "'Orbitron',monospace", fontSize: 15, fontWeight: 700, color: "#fff", margin: "0 0 14px", letterSpacing: 1 }}>
            {title}
          </h3>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.48)", lineHeight: 1.85, margin: 0 }}>
            {desc}
          </p>
          <div style={{ marginTop: "auto", paddingTop: 28, fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#00ffb4", letterSpacing: 3, opacity: active ? 1 : 0, transition: "opacity 0.25s" }}>
            EXPLORE →
          </div>
        </div>
      </Link>
      {/* Brief CTA — sits below the card link */}
      <button
        onClick={onBrief}
        style={{
          background: "rgba(0,255,180,0.06)",
          border: `1px solid ${active ? "rgba(0,255,180,0.3)" : "rgba(255,255,255,0.06)"}`,
          borderTop: "none",
          color: "#00ffb4",
          padding: "10px 16px",
          fontFamily: "'Space Mono',monospace",
          fontSize: 10,
          letterSpacing: 2,
          cursor: "pointer",
          width: "100%",
          textAlign: "left",
          opacity: active ? 1 : 0,
          transition: "all 0.25s",
        }}
      >
        BRIEF US →
      </button>
    </div>
  );
}
```

**Step 2: Pass onBrief from ServicesSection**

In `src/components/home/ServicesSection.jsx`:

```jsx
import { useBriefModal } from "../../context/BriefModalContext";

// Inside ServicesSection:
const { openBrief } = useBriefModal();

// On each ServiceCard:
<ServiceCard
  key={s.slug}
  service={s}
  active={active === i}
  onMouseEnter={() => setActive(i)}
  onMouseLeave={() => setActive(null)}
  isSmall={isSmall}
  onBrief={openBrief}
/>
```

**Step 3: Commit**

```bash
git add src/components/home/ServiceCard.jsx src/components/home/ServicesSection.jsx
git commit -m "feat: add Brief Us CTA to service cards"
```

---

### Task 6: Replace ContactSection with simple CTA

**Files:**
- Modify: `src/components/home/ContactSection.jsx`
- Modify: `src/pages/HomePage.jsx`

**Step 1: Replace ContactSection body**

Replace the entire section with a minimal centered CTA that opens the modal:

```jsx
// src/components/home/ContactSection.jsx
import { useBriefModal } from "../../context/BriefModalContext";
import { PAGE_PADDING_X, SECTION_PADDING_Y } from "../../constants/layout";
import { SectionLabel } from "../ui/SectionLabel";
import { ClipBtn } from "../ui/ClipBtn";

export function ContactSection() {
  const { openBrief } = useBriefModal();
  return (
    <section
      id="contact"
      style={{ padding: `${SECTION_PADDING_Y} ${PAGE_PADDING_X} clamp(48px,8vw,60px)`, textAlign: "center" }}
    >
      <SectionLabel>Start a Project</SectionLabel>
      <h2
        style={{
          fontFamily: "'Orbitron',monospace",
          fontSize: "clamp(28px,6vw,56px)",
          fontWeight: 900,
          color: "#fff",
          margin: "0 0 16px",
        }}
      >
        LET'S BUILD TOGETHER
      </h2>
      <p
        style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: 13,
          color: "rgba(255,255,255,0.38)",
          lineHeight: 1.8,
          marginBottom: 36,
        }}
      >
        Tell us about your idea. We'll respond within 24 hours.
      </p>
      <ClipBtn onClick={openBrief}>START YOUR BRIEF →</ClipBtn>
    </section>
  );
}
```

**Step 2: Remove hash scroll logic from HomePage**

In `src/pages/HomePage.jsx`, the `useEffect` that scrolls to `#contact` can be removed since the contact section no longer needs to be scrolled to for form entry. Keep the file clean:

```jsx
// src/pages/HomePage.jsx
import { Hero } from "../components/home/Hero";
import { ServicesSection } from "../components/home/ServicesSection";
import { AboutSection } from "../components/home/AboutSection";
import { ClientsSection } from "../components/home/ClientsSection";
import { ContactSection } from "../components/home/ContactSection";
import { LatestPostsSection } from "../components/home/LatestPostsSection";

export function HomePage() {
  return (
    <main style={{ position: "relative", zIndex: 1 }}>
      <Hero />
      <ServicesSection />
      <AboutSection />
      <ClientsSection />
      <LatestPostsSection />
      <ContactSection />
    </main>
  );
}
```

**Step 3: Commit**

```bash
git add src/components/home/ContactSection.jsx src/pages/HomePage.jsx
git commit -m "feat: replace ContactSection with modal CTA, clean up hash scroll"
```

---

### Task 7: Manual smoke test

Open the dev server (`npm run dev`) and verify:

1. Clicking **"Let's Talk"** in the navbar opens the modal
2. Clicking **"Start Your MVP"** in the Hero opens the modal
3. Hovering a service card shows **"BRIEF US →"** — clicking it opens the modal
4. Progress bar fills correctly across all 5 steps
5. Selecting an option highlights it with neon border
6. Back button navigates to the previous step
7. Clicking outside the modal or pressing ESC closes it
8. Submitting on the final step shows "BRIEF RECEIVED" confirmation
9. Body scroll is locked while modal is open
