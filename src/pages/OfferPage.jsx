import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

const MONO = "'Space Mono',monospace";
const ORBITRON = "'Orbitron',monospace";

export function OfferPage() {
  const { token } = useParams();
  const offer = useQuery(api.offers.getOfferByToken, { token });
  const submitFeedback = useMutation(api.offers.submitFeedback);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) { setError("Please select a rating."); return; }
    if (!comment.trim()) { setError("Please add a comment."); return; }
    setError("");
    setSubmitting(true);
    try {
      await submitFeedback({ offerId: offer._id, rating, comment });
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Failed to submit feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  if (offer === undefined) return (
    <div style={{ minHeight: "100vh", background: "#05080e", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontFamily: MONO, color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Loading…</p>
    </div>
  );

  if (offer === null) return (
    <div style={{ minHeight: "100vh", background: "#05080e", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ fontFamily: ORBITRON, color: "#fff", fontSize: 20 }}>Offer not found.</p>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#05080e", color: "#fff", padding: "clamp(32px, 8vw, 80px) clamp(16px, 5vw, 64px)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 48, display: "flex", alignItems: "center", gap: 20 }}>
          {offer.companyLogo && (
            <img src={offer.companyLogo} alt={offer.companyName} style={{ height: 56, width: 56, objectFit: "contain", borderRadius: 8, border: "1px solid rgba(0,255,180,0.2)" }} />
          )}
          <div>
            <div style={{ fontFamily: MONO, fontSize: 11, color: "#00ffb4", letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>
              Collaboration Offer for {offer.companyName}
            </div>
            <h1 style={{ fontFamily: ORBITRON, fontWeight: 900, fontSize: "clamp(22px, 4vw, 36px)", color: "#fff", lineHeight: 1.2 }}>
              {offer.offerTitle}
            </h1>
          </div>
        </div>

        {/* Description */}
        <div style={{ fontFamily: MONO, fontSize: 14, color: "rgba(255,255,255,0.65)", lineHeight: 1.9, marginBottom: 40, whiteSpace: "pre-wrap" }}>
          {offer.description}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 56 }}>
          {offer.infoLink && (
            <a href={offer.infoLink} target="_blank" rel="noreferrer" style={{ padding: "12px 28px", background: "#00ffb4", color: "#05080e", fontFamily: MONO, fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none", borderRadius: 6 }}>
              Learn More →
            </a>
          )}
          {offer.mvpLink && (
            <a href={offer.mvpLink} target="_blank" rel="noreferrer" style={{ padding: "12px 28px", background: "transparent", color: "#00ffb4", fontFamily: MONO, fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none", borderRadius: 6, border: "1px solid rgba(0,255,180,0.4)" }}>
              View MVP →
            </a>
          )}
        </div>

        {/* Feedback */}
        <div style={{ borderTop: "1px solid rgba(0,255,180,0.1)", paddingTop: 48 }}>
          <div style={{ fontFamily: MONO, fontSize: 11, color: "#00ffb4", letterSpacing: 4, textTransform: "uppercase", marginBottom: 24 }}>
            // Your Feedback
          </div>

          {submitted ? (
            <div style={{ padding: "40px 32px", border: "1px solid rgba(0,255,180,0.28)", background: "rgba(0,255,180,0.04)", borderRadius: 8, textAlign: "center" }}>
              <div style={{ fontSize: 32, color: "#00ffb4", marginBottom: 16 }}>⬡</div>
              <div style={{ fontFamily: ORBITRON, fontSize: 18, color: "#00ffb4", marginBottom: 8 }}>Thank You</div>
              <div style={{ fontFamily: MONO, fontSize: 13, color: "rgba(255,255,255,0.45)" }}>We'll be in touch soon.</div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Star rating */}
              <div>
                <div style={{ fontFamily: MONO, fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 12 }}>Rating</div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      style={{ background: "none", border: "none", cursor: "pointer", fontSize: 28, color: star <= rating ? "#00ffb4" : "rgba(255,255,255,0.2)", transition: "color 0.15s", padding: 0 }}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment */}
              <div>
                <div style={{ fontFamily: MONO, fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Comments</div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={5}
                  placeholder="Share your thoughts on this offer…"
                  style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,255,180,0.15)", borderRadius: 6, padding: "12px 16px", color: "#fff", fontFamily: MONO, fontSize: 13, outline: "none", resize: "vertical", boxSizing: "border-box" }}
                />
              </div>

              {error && (
                <div style={{ fontFamily: MONO, fontSize: 12, color: "#ff4466" }}>{error}</div>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{ alignSelf: "flex-start", padding: "12px 32px", background: submitting ? "rgba(0,255,180,0.3)" : "#00ffb4", color: "#05080e", border: "none", borderRadius: 6, fontFamily: MONO, fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", cursor: submitting ? "not-allowed" : "pointer" }}
              >
                {submitting ? "Submitting…" : "Submit Feedback"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
