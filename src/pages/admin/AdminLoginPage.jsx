import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "@convex-dev/auth/react";
import { useConvexAuth } from "convex/react";

const inputStyle = {
  width: "100%",
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(0,255,180,0.2)",
  borderRadius: 6,
  padding: "10px 14px",
  color: "#fff",
  fontFamily: "'Space Mono',monospace",
  fontSize: 13,
  outline: "none",
  boxSizing: "border-box",
};

export function AdminLoginPage() {
  const { signIn } = useAuthActions();
  const { isAuthenticated } = useConvexAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate("/admin");
  }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signIn("password", { email, password, flow: "signIn" });
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#05080e",
        padding: 24,
      }}
    >
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontFamily: "'Orbitron',monospace", fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: 2 }}>
            TREFORGE
          </div>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 3, marginTop: 6, textTransform: "uppercase" }}>
            Admin Panel
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
              Email
            </label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />
          </div>
          <div>
            <label style={{ display: "block", fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
              Password
            </label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} required />
          </div>

          {error && (
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#ff4466", padding: "8px 12px", background: "rgba(255,68,102,0.08)", borderRadius: 4, border: "1px solid rgba(255,68,102,0.2)" }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: 8,
              padding: "12px 0",
              background: loading ? "rgba(0,255,180,0.3)" : "#00ffb4",
              color: "#05080e",
              border: "none",
              borderRadius: 6,
              fontFamily: "'Space Mono',monospace",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: 2,
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
