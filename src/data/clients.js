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
  {
    slug: 'lilos-coffee',
    name: "Lilo’s Coffee Shop",
    tag: 'Desktop Application',
    location: 'Gjilan, Kosova',
    delivered: 'Coffee shop management: tables, orders, split bills, menus, and reports.',
    summary: 'A desktop management application for Lilo’s Coffee Shop in Gjilan, Kosova. Running on the shop’s computer, it brings table service, order-taking, menu management, and sales reporting into one workspace.',
    screenshot: '/clients/lilos-coffee/03-order-taking.webp',
    screenshotAlt: 'Lilo’s Coffee Shop desktop application showing an open table bill, current order, and drinks menu.',
    galleryNote: 'Application interface shown with demonstration data. This project runs on the coffee shop’s computer; there is no public online demo.',
    gallery: [
      { src: '/clients/lilos-coffee/03-order-taking.webp', title: 'Order-taking', alt: 'An open table bill, current order, and categorized drinks menu.', caption: 'Add drinks to an order while keeping the table’s running bill in view.' },
      { src: '/clients/lilos-coffee/02-table-overview.webp', title: 'Table overview', alt: 'Coffee shop floor overview with available tables, occupied tables, and assigned-server bills.', caption: 'See available and occupied tables, with current bills and assigned tables at a glance.' },
      { src: '/clients/lilos-coffee/04-split-bill.webp', title: 'Split bills', alt: 'Split-bill dialog showing selected drinks, quantities, and a partial-payment total.', caption: 'Select individual items and quantities to calculate a partial bill.' },
      { src: '/clients/lilos-coffee/05-menu-management.webp', title: 'Menu management', alt: 'Cold drinks menu showing product names, prices, availability, and editing controls.', caption: 'Manage the drinks menu, prices, categories, and product availability.' },
      { src: '/clients/lilos-coffee/06-sales-reports.webp', title: 'Sales reports', alt: 'Sales report with date and staff filters, sample open and paid bills, and a combined total.', caption: 'Review bills by date and staff member, including open and paid totals.' },
      { src: '/clients/lilos-coffee/01-login.webp', title: 'Staff sign-in', alt: 'Lilo’s Coffee staff sign-in screen with a numeric PIN keypad.', caption: 'A dedicated PIN sign-in screen for staff using the shop’s computer.' },
    ],
    story: {
      context: 'A coffee shop needs to keep table service, orders, and bills organized throughout the day. Lilo’s brings those daily tasks together in a desktop application on the shop’s computer.',
      scope: ['Table overview and order-taking', 'Item-based split bills', 'Menu and availability management', 'Staff sign-in and sales reports'],
      workflow: 'Staff sign in, select a table, and build an order from the drinks menu. The application keeps the current bill visible, supports splitting items, and provides reports for reviewing sales.',
    },
  },
];

export const getClientBySlug = (slug) =>
  CLIENTS.find((c) => c.slug === slug) ?? null;
