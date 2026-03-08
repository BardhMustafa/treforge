import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";

const BTN = { background: "none", border: "1px solid rgba(0,255,180,0.2)", color: "rgba(255,255,255,0.7)", cursor: "pointer", padding: "4px 10px", borderRadius: 4, fontSize: 12, fontFamily: "'Space Mono',monospace", transition: "all 0.2s" };
const BTN_ACTIVE = { ...BTN, color: "#00ffb4", borderColor: "#00ffb4" };

function ToolbarBtn({ onClick, active, children }) {
  return (
    <button type="button" onMouseDown={(e) => { e.preventDefault(); onClick(); }} style={active ? BTN_ACTIVE : BTN}>
      {children}
    </button>
  );
}

export function TiptapEditor({ content, onChange }) {
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const getUrl = useMutation(api.files.getUrl);
  const imageInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !editor) return;
    try {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await res.json();
      const url = await getUrl({ storageId });
      editor.chain().focus().setImage({ src: url }).run();
    } catch (err) {
      console.error("Image upload failed", err);
    }
  };

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: "Write your post content here…" }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || "", false);
    }
  }, [content]);

  const addLink = () => {
    const url = window.prompt("Enter URL");
    if (url && editor) {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    }
  };

  if (!editor) return null;

  return (
    <div>
      <style>{`
        .tiptap-editor .ProseMirror { outline: none; min-height: 320px; color: rgba(255,255,255,0.85); font-family: 'Space Mono',monospace; font-size: 14px; line-height: 1.7; }
        .tiptap-editor .ProseMirror p.is-editor-empty:first-child::before { content: attr(data-placeholder); color: rgba(255,255,255,0.2); float: left; pointer-events: none; height: 0; }
        .tiptap-editor .ProseMirror h1,.tiptap-editor .ProseMirror h2,.tiptap-editor .ProseMirror h3 { color: #fff; margin: 16px 0 8px; }
        .tiptap-editor .ProseMirror a { color: #00ffb4; }
        .tiptap-editor .ProseMirror blockquote { border-left: 3px solid #00ffb4; padding-left: 12px; color: rgba(255,255,255,0.5); }
        .tiptap-editor .ProseMirror code { background: rgba(0,255,180,0.08); padding: 2px 5px; border-radius: 3px; font-size: 13px; }
        .tiptap-editor .ProseMirror pre { background: rgba(0,255,180,0.06); padding: 12px; border-radius: 6px; overflow-x: auto; }
        .tiptap-editor .ProseMirror ul, .tiptap-editor .ProseMirror ol { padding-left: 20px; }
        .tiptap-editor .ProseMirror img { max-width: 100%; border-radius: 6px; }
      `}</style>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")}>B</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")}>I</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive("strike")}>S</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive("heading", { level: 1 })}>H1</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive("heading", { level: 2 })}>H2</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive("heading", { level: 3 })}>H3</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")}>•List</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")}>1.List</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")}>"</ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleCode().run()} active={editor.isActive("code")}>{`<>`}</ToolbarBtn>
        <ToolbarBtn onClick={addLink} active={editor.isActive("link")}>Link</ToolbarBtn>
        <ToolbarBtn onClick={() => imageInputRef.current.click()} active={false}>Img</ToolbarBtn>
        <input ref={imageInputRef} type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} />
      </div>
      <div
        className="tiptap-editor"
        style={{
          border: "1px solid rgba(0,255,180,0.2)",
          borderRadius: 6,
          padding: "12px 16px",
          background: "rgba(0,255,180,0.02)",
        }}
      >
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
