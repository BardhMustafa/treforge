export const CLIENTS = [
  {
    slug: 'pronex',
    name: 'Pronex',
    url: 'https://www.pronex-ks.com',
    tag: 'Real Estate',
    delivered: 'A property platform, internal tools, and a pricing-assistance prototype.',
    story: {
      context: 'A real estate agency needs a clear public presence and useful tools behind the listings. Our work for Pronex connects those customer-facing and internal needs.',
      scope: ['Real estate web presence', 'Internal business tools', 'AI Çmimi pricing-assistance prototype'],
      workflow: 'AI Çmimi is a rules-based prototype that helps put an asking price in context. An AWS AgentCore workflow is a proposed next step, not a deployed AI capability.',
    },
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
    delivered: 'Furniture e-commerce, with product and order management in one admin panel.',
    story: {
      context: 'HM Home needed more than an online showcase: a furniture storefront for shoppers, paired with a practical way for the team to manage its catalog and incoming orders.',
      scope: ['Customer-facing furniture storefront', 'Admin panel for managing products', 'Customer order management'],
      workflow: 'Customers explore the furniture collection through the storefront. Behind it, the HM Home team manages products and customer orders through its admin panel.',
    },
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
    delivered: 'A digital presence for a door and window manufacturer serving EU markets.',
    location: 'Viti, Kosova',
    exportMarket: 'EU',
    summary:
      'Lial HC is a door and window manufacturing company in Viti, Kosova, exporting to the EU. We built digital solutions to support their operations and reach.',
    screenshot: '/clients/lial-hc.jpg',
  },
  {
    slug: 'gazi',
    delivered: 'A web platform presenting windows, glass, and doors to local and EU customers.',
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
