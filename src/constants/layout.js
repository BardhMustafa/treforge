export const PAGE_PADDING_X = "clamp(16px, 5vw, 64px)";
export const SECTION_PADDING_Y = "clamp(60px, 10vh, 120px)";

export const NAV_LINKS = [
  { label: "Services", path: "/#services", hash: "services" },
  { label: "About", path: "/#about", hash: "about" },
  { label: "Clients", path: "/#clients", hash: "clients" },
  { label: "Contact", path: "/#contact", hash: "contact" },
  { label: "Blog", path: "/blog" },
];

export const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};
