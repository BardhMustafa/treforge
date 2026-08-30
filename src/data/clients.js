export const CLIENTS = [
  {
    slug: 'pronex',
    name: 'Pronex',
    url: 'https://www.pronex-ks.com',
    tag: 'Real Estate',
    delivered: 'A property website, property-management admin panel, and AI Çmimi pricing prototype.',
    story: {
      context: 'Pronex needs a property website for buyers and an admin panel for its team to manage properties. Our work connects that public experience with property-management tools and pricing guidance.',
      scope: ['Real estate website and property listings', 'Admin panel for managing properties', 'AI Çmimi pricing-assistance prototype'],
      workflow: 'The Pronex team manages properties through its admin panel, while buyers explore listings on the website. AI Çmimi adds rules-based guidance to help put an asking price in context. An AWS AgentCore workflow is a proposed next step, not a deployed AI capability.',
    },
    location: 'Prizren, Kosova',
    summary:
      'Pronex is a real estate agency in Prizren, Kosova. We built its property website, an admin panel for managing properties, and AI Çmimi—a rules-based pricing-assistant prototype.',
    screenshot: '/clients/pronex.jpg',
    testimonial: {
      quote: 'Collaborating with Treforge started with a simple idea—a real estate platform—and grew through meetings and discussions about the real problems we saw in the market. We wanted a mixed platform where people can list their own properties while staying private, with the Pronex team handling the rest, alongside the deals we post with construction companies. More recently we introduced “AI Çmimi,” an AI assistant that helps evaluate a property’s price before it’s published.',
      date: 'May 2026',
    },
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
    testimonial: {
      quote: 'Selling furniture on social media was a mess. Contacting Treforge and having them deliver an e-commerce platform where we manage products and orders in no time was a real relief. Their dedication was on point—they took care of design, development, shipping it live, and keeping it running.',
    },
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
    testimonial: {
      quote: 'Exporting from our country to the European market needed a real online presence. Soon after we contacted Treforge we had a first prototype, and within days they delivered the final product that stepped up our presence.',
    },
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
    testimonial: {
      quote: 'Treforge helped us step up our online presence and show our work and products to local and international clients. We came with a request and left the rest in their hands. Our journey started with mockups, grew into a real website, and won’t stop here.',
    },
  },
  {
    slug: 'lilos-coffee',
    name: "Lilo’s Coffee Shop",
    tag: 'Desktop Application',
    location: 'Gjilan, Kosova',
    delivered: 'Coffee shop management: tables, orders, split bills, menus, and reports.',
    summary: 'A desktop management application for Lilo’s Coffee Shop in Gjilan, Kosova. Running on the shop’s computer, it brings table service, order-taking, menu management, and sales reporting into one workspace.',
    testimonial: {
      quote: 'Products, orders, waiters—thinking about all of this before opening the coffee shop sounded stressful. Before we started, I ran into the Treforge guys and they got it. They crafted the desktop application that runs on the shop’s computer and handles everything I mentioned, and it made my job as an owner much easier.',
      attribution: 'Owner',
    },
    screenshot: '/clients/lilos-coffee/03-order-taking-dark.webp',
    screenshotAlt: 'Lilo’s Coffee Shop desktop application in dark mode showing a table bill, staged order, and color-coded drinks menu.',
    galleryNote: 'The refreshed application interface in dark and light themes, shown with demonstration data. This project runs on the coffee shop’s computer; there is no public online demo.',
    gallery: [
      { src: '/clients/lilos-coffee/03-order-taking-dark.webp', title: 'Orders · Dark', alt: 'Dark-mode point-of-sale interface with a bill, staged order, and color-coded coffee menu.', caption: 'Build an order from the color-coded drinks menu while keeping the table’s bill in view.' },
      { src: '/clients/lilos-coffee/02-floor-plan-dark.webp', title: 'Floor plan · Dark', alt: 'Dark-mode coffee shop floor plan with different table shapes, availability, and active bill totals.', caption: 'See table shapes, availability, and current bills in the floor-plan view.' },
      { src: '/clients/lilos-coffee/04-split-bill-dark.webp', title: 'Split bills · Dark', alt: 'Dark-mode partial-payment dialog showing selected drinks and a calculated total.', caption: 'Select drinks and quantities to calculate a partial bill.' },
      { src: '/clients/lilos-coffee/05-menu-management-dark.webp', title: 'Menu management · Dark', alt: 'Dark-mode menu administration with product colors, euro prices, and availability.', caption: 'Manage menu items, product colors, prices, and availability.' },
      { src: '/clients/lilos-coffee/06-sales-reports-dark.webp', title: 'Sales reports · Dark', alt: 'Dark-mode date-filtered staff report showing sample open and paid bills.', caption: 'Review sample open and paid bills using date and staff filters.' },
      { src: '/clients/lilos-coffee/01-login-dark.webp', title: 'Staff sign-in · Dark', alt: 'Lilo’s Coffee branded staff sign-in screen in dark mode.', caption: 'The staff sign-in experience in the application’s dark theme.' },
      { src: '/clients/lilos-coffee/09-order-taking-light.webp', title: 'Orders · Light', alt: 'Light-mode point-of-sale interface with a staged coffee order and product cards.', caption: 'The same ordering workflow in the application’s light theme.' },
      { src: '/clients/lilos-coffee/08-floor-plan-light.webp', title: 'Floor plan · Light', alt: 'Light-mode coffee shop floor plan with occupied and available tables.', caption: 'View table availability and running bills in the light theme.' },
      { src: '/clients/lilos-coffee/07-login-light.webp', title: 'Staff sign-in · Light', alt: 'Lilo’s Coffee staff sign-in screen in light mode.', caption: 'The staff sign-in experience in the application’s light theme.' },
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
