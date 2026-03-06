export const CLIENTS = [
  {
    slug: "pronex",
    name: "Pronex",
    url: "https://www.pronex-ks.com",
    tag: "Real Estate",
    summary: "Pronex is a real estate agency in Kosovo. We delivered a modern web presence and internal tools to support their growth.",
    screenshot: "/clients/pronex.jpg",
  },
  {
    slug: "lial-hc",
    name: "Lial HC",
    url: "https://www.lialhc.com",
    tag: "Manufacturing",
    summary: "Lial HC is a door and window manufacturing company operating in Kosovo, exporting to the EU. We built digital solutions to support their operations and reach.",
    screenshot: "/clients/lial-hc.jpg",
  },
  {
    slug: "gazi",
    name: "Gazi",
    url: "https://www.gazi-ks.com",
    tag: "Manufacturing",
    summary: "Gazi is a window, glass, and door manufacturing company. We built a scalable web platform and digital tools to support their operations.",
    screenshot: "/clients/gazi.jpg",
  },
  {
    slug: "elia-partnerships",
    name: "Elia Partnerships",
    url: "https://www.elia-partnerships.com",
    tag: "Agency",
    summary: "Elia Partnerships is an agency connecting services across the EU and UAE with Kosovo. We delivered a professional site and tools to support their cross-border reach.",
    screenshot: "/clients/elia-partnerships.jpg",
  },
];

export const getClientBySlug = (slug) =>
  CLIENTS.find((c) => c.slug === slug) ?? null;
