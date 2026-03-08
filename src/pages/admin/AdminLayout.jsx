import { useConvexAuth } from "convex/react";
import { Navigate, Outlet, Link, useNavigate } from "react-router-dom";
import { useAuthActions } from "@convex-dev/auth/react";

export function AdminLayout() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const { signOut } = useAuthActions();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#05080e" }}>
        <span style={{ fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Loading…</span>
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#05080e", display: "flex", flexDirection: "column" }}>
      <header style={{
        padding: "14px 32px",
        background: "rgba(5,8,14,0.96)",
        borderBottom: "1px solid rgba(0,255,180,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Link to="/" style={{ fontFamily: "'Orbitron',monospace", fontWeight: 700, fontSize: 16, color: "#fff", textDecoration: "none", letterSpacing: 2 }}>
            TREFORGE
          </Link>
          <span style={{ color: "rgba(0,255,180,0.4)", fontSize: 12 }}>/</span>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#00ffb4", letterSpacing: 2 }}>ADMIN</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Link to="/admin" style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.6)", textDecoration: "none", letterSpacing: 1 }}>
            Dashboard
          </Link>
          <Link to="/admin/posts/new" style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.6)", textDecoration: "none", letterSpacing: 1 }}>
            New Post
          </Link>
          <Link to="/admin/offers" style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.6)", textDecoration: "none", letterSpacing: 1 }}>
            Offers
          </Link>
          <Link to="/admin/sources" style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "rgba(255,255,255,0.6)", textDecoration: "none", letterSpacing: 1 }}>
            Sources
          </Link>
          <button
            onClick={handleSignOut}
            style={{ background: "none", border: "1px solid rgba(0,255,180,0.2)", color: "rgba(255,255,255,0.5)", cursor: "pointer", padding: "5px 14px", borderRadius: 4, fontFamily: "'Space Mono',monospace", fontSize: 11, letterSpacing: 1 }}
          >
            Sign Out
          </button>
        </div>
      </header>
      <main style={{ flex: 1, padding: "40px 32px", maxWidth: 1100, width: "100%", margin: "0 auto", boxSizing: "border-box" }}>
        <Outlet />
      </main>
    </div>
  );
}
