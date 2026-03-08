import { action } from "./_generated/server";
import { v } from "convex/values";

export const sendContactEmail = action({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (_ctx, { name, email, message }) => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY not set");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Treforge Contact <onboarding@resend.dev>",
        to: "baardhmustafa@gmail.com",
        reply_to: email,
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || "Failed to send email");
    }
  },
});
