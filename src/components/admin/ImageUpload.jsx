import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

export function ImageUpload({ onUpload, currentUrl, label = "Image" }) {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const getUrl = useMutation(api.files.getUrl);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentUrl || "");
  const inputRef = useRef(null);

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await res.json();
      const url = await getUrl({ storageId });
      setPreview(url);
      onUpload(url);
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: preview ? 12 : 0 }}>
        <button
          type="button"
          onClick={() => inputRef.current.click()}
          disabled={uploading}
          style={{
            padding: "8px 18px",
            background: uploading ? "rgba(0,255,180,0.2)" : "rgba(0,255,180,0.08)",
            border: "1px solid rgba(0,255,180,0.3)",
            borderRadius: 6,
            color: uploading ? "rgba(0,255,180,0.5)" : "#00ffb4",
            fontFamily: "'Space Mono',monospace",
            fontSize: 12,
            cursor: uploading ? "not-allowed" : "pointer",
            letterSpacing: 1,
          }}
        >
          {uploading ? "Uploading…" : `Upload ${label}`}
        </button>
        {preview && (
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 11, color: "rgba(255,255,255,0.35)" }}>
            Image uploaded
          </span>
        )}
        <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
      </div>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          style={{ maxWidth: "100%", maxHeight: 200, borderRadius: 6, border: "1px solid rgba(0,255,180,0.15)", objectFit: "cover" }}
        />
      )}
    </div>
  );
}
