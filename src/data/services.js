export const SERVICES = [
  {
    slug: "web-development",
    icon: "◈",
    title: "Web Development",
    desc: "Lightning-fast, scalable web apps engineered for growth. From MVPs to enterprise platforms — shipped in days.",
    longDesc: "We build web applications that scale with your business. From MVPs to enterprise platforms, our stack is chosen for speed and reliability. Every project is delivered with clean architecture, modern tooling, and documentation your team can maintain.",
    highlights: ["React / Next.js", "Vite", "Node.js backends", "Deployment & CI/CD"],
  },
  {
    slug: "app-development",
    icon: "◉",
    title: "App Development",
    desc: "Native and cross-platform mobile apps built with precision. Your idea, live on every device, faster than you think.",
    longDesc: "Native and cross-platform mobile apps that feel right on every device. We use React Native and modern tooling to ship once and run everywhere, without sacrificing performance or UX.",
    highlights: ["React Native", "iOS & Android", "Expo", "App Store deployment"],
  },
  {
    slug: "ai-integration",
    icon: "⬡",
    title: "AI Integration",
    desc: "Embed intelligence into your product. LLMs, automation, smart workflows — we make AI work for your business.",
    longDesc: "We integrate LLMs, automation, and smart workflows into your product. From chatbots to document analysis, we make AI practical and deployable — not just demos.",
    highlights: ["LLM integration", "RAG & embeddings", "Workflow automation", "API design"],
  },
  {
    slug: "data-engineering",
    icon: "◫",
    title: "Data Engineering",
    desc: "Robust pipelines, clean architecture, and real-time data flows that your team can actually rely on.",
    longDesc: "Data pipelines and architecture that your team can rely on. We design for clarity, observability, and scale — so data becomes a asset, not a bottleneck.",
    highlights: ["ETL pipelines", "Real-time flows", "Data modeling", "Monitoring"],
  },
  {
    slug: "power-bi-platform",
    icon: "◳",
    title: "Power BI Platform",
    desc: "Turn raw data into decisions. We build Power BI dashboards that executives actually open and trust.",
    longDesc: "Power BI dashboards and reports that executives actually use. We focus on clarity, actionability, and governance so your data drives decisions.",
    highlights: ["Dashboards", "DAX & modeling", "Governance", "Training"],
  },
];

export const getServiceBySlug = (slug) =>
  SERVICES.find((s) => s.slug === slug) ?? null;
