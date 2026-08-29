export const CLIENTS = [
  {
    slug: 'pronex',
    name: 'Pronex',
    url: 'https://www.pronex-ks.com',
    tag: 'Real Estate',
    summary:
      'Pronex is a real estate agency in Kosovo. We delivered a modern web presence and internal tools to support their growth.',
    screenshot: '/clients/pronex.jpg',
  },
  {
    slug: 'hm-home',
    name: 'HM Home',
    url: 'https://hmhomeks.com',
    tag: 'E-commerce',
    summary:
      'HM Home is a furniture shop in Prizren, Kosovo. We built its e-commerce storefront and an admin panel for managing products and customer orders.',
    screenshot: '/clients/hm-home.jpg',
  },
  {
    slug: 'lial-hc',
    name: 'Lial HC',
    url: 'https://www.lialhc.com',
    tag: 'Manufacturing',
    summary:
      'Lial HC is a door and window manufacturing company operating in Kosovo, exporting to the EU. We built digital solutions to support their operations and reach.',
    screenshot: '/clients/lial-hc.jpg',
  },
  {
    slug: 'gazi',
    name: 'Gazi',
    url: 'https://www.gazi-rks.com',
    tag: 'Manufacturing',
    summary:
      'Gazi is a window, glass, and door manufacturing company. We built a scalable web platform and digital tools to support their operations.',
    screenshot: '/clients/gazi.jpg',
  },
];

export const getClientBySlug = (slug) =>
  CLIENTS.find((c) => c.slug === slug) ?? null;
