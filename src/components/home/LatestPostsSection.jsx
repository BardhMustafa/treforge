import { useQuery } from "convex/react";
import { Link } from "react-router-dom";
import { api } from "../../../convex/_generated/api";
import { BlogPostCard } from "../blog/BlogPostCard";
import { PAGE_PADDING_X, SECTION_PADDING_Y } from "../../constants/layout";

export function LatestPostsSection() {
  const posts = useQuery(api.posts.getLatestPosts, { count: 3 });

  if (!posts || posts.length === 0) return null;

  return (
    <section style={{ paddingTop: SECTION_PADDING_Y, paddingBottom: SECTION_PADDING_Y, paddingLeft: PAGE_PADDING_X, paddingRight: PAGE_PADDING_X }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
          <div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#00ffb4", letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>
              // BLOG
            </div>
            <h2 style={{ fontFamily: "'Orbitron',monospace", fontWeight: 900, fontSize: "clamp(22px, 4vw, 38px)", color: "#fff" }}>
              Latest Posts
            </h2>
          </div>
          <Link
            to="/blog"
            style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "#00ffb4", textDecoration: "none", letterSpacing: 2, textTransform: "uppercase", border: "1px solid rgba(0,255,180,0.3)", padding: "8px 20px", borderRadius: 4, transition: "all 0.2s", whiteSpace: "nowrap" }}
            onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,255,180,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
          >
            View All →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))", gap: 24 }}>
          {posts.map((post) => (
            <BlogPostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
