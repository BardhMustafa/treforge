import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Link } from "react-router-dom";

const rowStyle = { display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: 16, alignItems: "center", padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.05)" };

export function AdminDashboardPage() {
  const posts = useQuery(api.posts.getAllPostsAdmin);
  const togglePublished = useMutation(api.posts.togglePublished);
  const deletePost = useMutation(api.posts.deletePost);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete "${title}"?`)) {
      await deletePost({ id });
    }
  };

  const btnStyle = (color) => ({
    background: "none",
    border: `1px solid ${color}`,
    color,
    cursor: "pointer",
    padding: "4px 12px",
    borderRadius: 4,
    fontFamily: "'Space Mono',monospace",
    fontSize: 11,
    letterSpacing: 1,
    whiteSpace: "nowrap",
  });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <h1 style={{ fontFamily: "'Orbitron',monospace", fontSize: 22, color: "#fff", fontWeight: 700 }}>Posts</h1>
        <Link
          to="/admin/posts/new"
          style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#05080e", background: "#00ffb4", padding: "8px 20px", borderRadius: 5, textDecoration: "none", letterSpacing: 1, fontWeight: 700 }}
        >
          + New Post
        </Link>
      </div>

      {posts === undefined && (
        <p style={{ fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Loading…</p>
      )}

      {posts?.length === 0 && (
        <p style={{ fontFamily: "'Space Mono',monospace", color: "rgba(255,255,255,0.4)", fontSize: 13 }}>No posts yet.</p>
      )}

      {posts && posts.length > 0 && (
        <div style={{ border: "1px solid rgba(0,255,180,0.1)", borderRadius: 8, overflow: "hidden" }}>
          <div style={{ ...rowStyle, background: "rgba(0,255,180,0.04)" }}>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 2, textTransform: "uppercase" }}>Title</span>
            <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.4)", letterSpacing: 2, textTransform: "uppercase" }}>Status</span>
            <span></span>
            <span></span>
          </div>
          {posts.map((post) => (
            <div key={post._id} style={rowStyle}>
              <div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 13, color: "#fff" }}>{post.title}</div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>/blog/{post.slug}</div>
              </div>
              <span style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: 10,
                letterSpacing: 2,
                padding: "3px 10px",
                borderRadius: 20,
                background: post.published ? "rgba(0,255,180,0.1)" : "rgba(255,255,255,0.05)",
                color: post.published ? "#00ffb4" : "rgba(255,255,255,0.4)",
                border: `1px solid ${post.published ? "rgba(0,255,180,0.3)" : "rgba(255,255,255,0.1)"}`,
                textTransform: "uppercase",
              }}>
                {post.published ? "Published" : "Draft"}
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => togglePublished({ id: post._id })} style={btnStyle(post.published ? "rgba(255,200,0,0.6)" : "rgba(0,255,180,0.6)")}>
                  {post.published ? "Unpublish" : "Publish"}
                </button>
                <Link to={`/admin/posts/${post._id}/edit`} style={{ ...btnStyle("rgba(100,150,255,0.6)"), textDecoration: "none" }}>
                  Edit
                </Link>
              </div>
              <button onClick={() => handleDelete(post._id, post.title)} style={btnStyle("rgba(255,68,68,0.6)")}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
