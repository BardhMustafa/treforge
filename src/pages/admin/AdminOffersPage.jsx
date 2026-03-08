import { useQuery, useMutation } from "convex/react";
import { Link } from "react-router-dom";
import { api } from "../../../convex/_generated/api";

export function AdminOffersPage() {
  const offers = useQuery(api.offers.getAllOffers);
  const deleteOffer = useMutation(api.offers.deleteOffer);

  const copyLink = (token) => {
    navigator.clipboard.writeText(`${window.location.origin}/offer/${token}`);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this offer?")) return;
    await deleteOffer({ id });
  };

  const MONO = "'Space Mono',monospace";
  const ORBITRON = "'Orbitron',monospace";

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <h1 style={{ fontFamily: ORBITRON, fontSize: 22, color: "#fff", fontWeight: 700 }}>Offers</h1>
        <Link to="/admin/offers/new" style={{ padding: "10px 24px", background: "#00ffb4", color: "#05080e", fontFamily: MONO, fontWeight: 700, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", textDecoration: "none", borderRadius: 6 }}>
          + New Offer
        </Link>
      </div>

      {offers === undefined && <p style={{ fontFamily: MONO, color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Loading…</p>}
      {offers?.length === 0 && <p style={{ fontFamily: MONO, color: "rgba(255,255,255,0.4)", fontSize: 13 }}>No offers yet.</p>}

      {offers && offers.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {offers.map((offer) => (
            <div key={offer._id} style={{ display: "grid", gridTemplateColumns: "1fr auto", alignItems: "center", gap: 16, padding: "16px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(0,255,180,0.1)", borderRadius: 6 }}>
              <div>
                <div style={{ fontFamily: MONO, fontSize: 11, color: "#00ffb4", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{offer.companyName}</div>
                <div style={{ fontFamily: ORBITRON, fontSize: 14, color: "#fff" }}>{offer.offerTitle}</div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => copyLink(offer.token)} style={{ padding: "6px 14px", background: "none", border: "1px solid rgba(0,255,180,0.3)", borderRadius: 4, color: "#00ffb4", fontFamily: MONO, fontSize: 11, cursor: "pointer", letterSpacing: 1 }}>
                  Copy Link
                </button>
                <Link to={`/admin/offers/${offer._id}/feedback`} style={{ padding: "6px 14px", background: "none", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 4, color: "rgba(255,255,255,0.6)", fontFamily: MONO, fontSize: 11, textDecoration: "none", letterSpacing: 1 }}>
                  Feedback
                </Link>
                <button onClick={() => handleDelete(offer._id)} style={{ padding: "6px 14px", background: "none", border: "1px solid rgba(255,68,102,0.3)", borderRadius: 4, color: "#ff4466", fontFamily: MONO, fontSize: 11, cursor: "pointer", letterSpacing: 1 }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
