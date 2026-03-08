import { useQuery } from "convex/react";
import { useParams, Link } from "react-router-dom";
import { api } from "../../../convex/_generated/api";

const MONO = "'Space Mono',monospace";

export function AdminOfferFeedbackPage() {
  const { id } = useParams();
  const offer = useQuery(api.offers.getOfferById, { id });
  const feedback = useQuery(api.offers.getFeedbackForOffer, { offerId: id });

  return (
    <div>
      <Link to="/admin/offers" style={{ fontFamily: MONO, fontSize: 11, color: "rgba(255,255,255,0.4)", textDecoration: "none", letterSpacing: 2, textTransform: "uppercase", display: "inline-block", marginBottom: 32 }}>
        ← Back to Offers
      </Link>

      <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: 22, color: "#fff", fontWeight: 700, marginBottom: 8 }}>
        Feedback
      </h1>
      {offer && (
        <div style={{ fontFamily: MONO, fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 32 }}>
          {offer.companyName} — {offer.offerTitle}
        </div>
      )}

      {feedback === undefined && <p style={{ fontFamily: MONO, color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Loading…</p>}
      {feedback?.length === 0 && <p style={{ fontFamily: MONO, color: "rgba(255,255,255,0.4)", fontSize: 13 }}>No feedback yet.</p>}

      {feedback && feedback.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {feedback.map((fb) => (
            <div key={fb._id} style={{ padding: "20px 24px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,255,180,0.1)", borderRadius: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
                <div style={{ fontSize: 18, color: "#00ffb4" }}>{"★".repeat(fb.rating)}{"☆".repeat(5 - fb.rating)}</div>
                <div style={{ fontFamily: MONO, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
                  {new Date(fb.submittedAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                </div>
              </div>
              <p style={{ fontFamily: MONO, fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7, margin: 0 }}>{fb.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
