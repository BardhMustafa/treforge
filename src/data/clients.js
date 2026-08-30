export const CLIENTS = [
  {
    slug: 'pronex',
    name: 'Pronex',
    url: 'https://www.pronex-ks.com',
    tag: 'Real Estate',
    location: 'Prizren, Kosova',
    summary:
      'Pronex is a real estate agency in Prizren, Kosova. We delivered a modern web presence and internal tools to support their growth.',
    screenshot: '/clients/pronex.jpg',
  },
  {
    slug: 'hm-home',
    name: 'HM Home',
    url: 'https://hmhomeks.com',
    tag: 'E-commerce',
    location: 'Prizren, Kosova',
    summary:
      'HM Home is a furniture shop in Prizren, Kosova. We built its e-commerce storefront and an admin panel for managing products and customer orders.',
    screenshot: '/clients/hm-home.jpg',
  },
  {
    slug: 'lial-hc',
    name: 'Lial HC',
    url: 'https://www.lialhc.com',
    tag: 'Manufacturing',
    location: 'Viti, Kosova',
    exportMarket: 'EU',
    summary:
      'Lial HC is a door and window manufacturing company in Viti, Kosova, exporting to the EU. We built digital solutions to support their operations and reach.',
    screenshot: '/clients/lial-hc.jpg',
  },
  {
    slug: 'gazi',
    name: 'Gazi',
    url: 'https://www.gazi-rks.com',
    tag: 'Manufacturing',
    location: 'Gjilan, Kosova',
    exportMarket: 'EU',
    summary:
      'Gazi is a window, glass, and door manufacturing company in Gjilan, Kosova, exporting to the EU. We built a scalable web platform and digital tools to support their operations.',
    screenshot: '/clients/gazi.jpg?v=20260830-3',
  },
];

export const getClientBySlug = (slug) =>
  CLIENTS.find((c) => c.slug === slug) ?? null;
