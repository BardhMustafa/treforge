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
    products: [
      {
        title: "Real-Time Event Pipeline",
        tagline: "Raw events → cleaned, enriched, queryable in under 5 seconds",
        visual: "pipeline",
        nodes: ["REST API / Webhooks", "Kafka", "Stream Processor", "Data Warehouse", "BI / App Layer"],
        nodeLabels: ["Ingest", "Queue", "Transform", "Store", "Serve"],
        steps: [
          {
            label: "Ingest",
            benefit: "Events land in your pipeline the moment they happen — no polling, no delays.",
            tech: [
              "REST & webhook endpoints, auto-validated on arrival",
              "Rate limiting and back-pressure handled at the edge",
              "Schema registry enforces contract between producers",
            ],
          },
          {
            label: "Queue",
            benefit: "Your data is never lost — even if downstream systems go down temporarily.",
            tech: [
              "Kafka 3.x, partitioned by event type for parallel throughput",
              "Handles 50k+ events/sec with sub-10ms latency",
              "Dead-letter queue captures and replays failed messages",
            ],
          },
          {
            label: "Transform",
            benefit: "Raw, messy data becomes clean, enriched records your team can actually use.",
            tech: [
              "Stateless stream processor — horizontally scalable",
              "Field normalization, deduplication, and enrichment in-flight",
              "Exactly-once semantics to prevent duplicate records",
            ],
          },
          {
            label: "Store",
            benefit: "Transformed data lands in a warehouse optimized for fast analytical queries.",
            tech: [
              "Columnar storage with partitioning by date and entity",
              "Automated retention policies and cold-storage tiering",
              "Point-in-time recovery for any 30-day window",
            ],
          },
          {
            label: "Serve",
            benefit: "Your dashboards and apps query clean, fresh data — not stale exports.",
            tech: [
              "Read-optimized views and materialized aggregates",
              "Role-based access control per consuming system",
              "Query response times under 200ms at p99",
            ],
          },
        ],
      },
      {
        title: "Batch ETL & Data Lake Architecture",
        tagline: "Legacy sources unified into a single source of truth",
        visual: "pipeline",
        nodes: ["Postgres / CSV / ERP", "Ingestion Layer", "Raw Zone", "dbt Transform", "Gold Layer", "Reporting"],
        nodeLabels: ["Extract", "Load", "Raw", "Transform", "Curated", "Consume"],
        steps: [
          {
            label: "Extract",
            benefit: "Every source — no matter how legacy — feeds into one unified pipeline.",
            tech: [
              "Connectors for Postgres, flat files, and ERP APIs",
              "Incremental extraction using watermarks to minimize load",
              "Source-system credentials stored in a secrets manager",
            ],
          },
          {
            label: "Load",
            benefit: "Data arrives in your lake quickly and reliably, without manual intervention.",
            tech: [
              "Idempotent loads — safe to re-run without duplicates",
              "Parallel ingestion threads per source for speed",
              "Load manifests logged for full auditability",
            ],
          },
          {
            label: "Raw",
            benefit: "A complete, unmodified history of everything that ever came in — always replayable.",
            tech: [
              "Immutable raw zone — original data is never overwritten",
              "Parquet format with Snappy compression",
              "Partitioned by source and ingestion date",
            ],
          },
          {
            label: "Transform",
            benefit: "Business logic lives in version-controlled SQL — not buried in spreadsheets.",
            tech: [
              "dbt models with full lineage graph and documentation",
              "Automated data quality tests on every model run",
              "CI pipeline runs transformations on every merge",
            ],
          },
          {
            label: "Curated",
            benefit: "A trusted, business-ready layer your analysts can query with confidence.",
            tech: [
              "Star schema design optimized for BI tools",
              "SLA monitoring with alerts on late or missing data",
              "Semantic layer with standardized metric definitions",
            ],
          },
          {
            label: "Consume",
            benefit: "Reports and dashboards pull from a single source of truth — no more conflicting numbers.",
            tech: [
              "Direct connector to Power BI, Tableau, and Metabase",
              "Cached aggregates for sub-second dashboard load times",
              "Row-level security mapped to org structure",
            ],
          },
        ],
      },
    ],
  },
  {
    slug: "power-bi-platform",
    icon: "◳",
    title: "Power BI",
    desc: "Turn raw data into decisions. We build Power BI dashboards that executives actually open and trust.",
    longDesc: "Power BI dashboards and reports that executives actually use. We focus on clarity, actionability, and governance so your data drives decisions.",
    highlights: ["Dashboards", "DAX & modeling", "Governance", "Training"],
    products: [
      {
        title: "Sales & Revenue Dashboard",
        tagline: "From CRM and ERP exports to a live executive report",
        visual: "dashboard",
        nodes: ["Salesforce + ERP", "Power Query ETL", "Star Schema Model", "DAX Measures", "Dashboard"],
        nodeLabels: ["Source", "ETL", "Model", "Logic", "Report"],
        kpis: ["$2.4M Revenue", "+18% MoM", "$890K Pipeline"],
        steps: [
          {
            label: "Source",
            benefit: "All your sales and financial data flows in automatically — no manual exports.",
            tech: [
              "Scheduled refresh from Salesforce REST API and ERP flat files",
              "Incremental load using modified-date watermarks",
              "Credentials managed via Power BI gateway",
            ],
          },
          {
            label: "ETL",
            benefit: "Inconsistent formats, nulls, and duplicates are cleaned before they touch your model.",
            tech: [
              "Power Query M transformations with full step history",
              "Null handling, type coercion, and duplicate removal",
              "Reusable query functions shared across datasets",
            ],
          },
          {
            label: "Model",
            benefit: "A well-designed model means every number in your report is trustworthy and consistent.",
            tech: [
              "Star schema: one fact table, clean dimension tables",
              "Relationships enforced with single-direction filters",
              "Date table with fiscal calendar support",
            ],
          },
          {
            label: "Logic",
            benefit: "Complex metrics like MoM growth and rolling averages are calculated once and reused everywhere.",
            tech: [
              "DAX measures with time intelligence (MTD, QTD, YTD)",
              "Dynamic KPI thresholds with conditional formatting",
              "Calculation groups to reduce measure duplication",
            ],
          },
          {
            label: "Report",
            benefit: "Executives open a report that actually answers their questions — no training needed.",
            tech: [
              "Bookmark-driven navigation for guided storytelling",
              "Row-level security so each user sees their own data",
              "Published to Power BI Service with scheduled refresh",
            ],
          },
        ],
      },
      {
        title: "Operational KPIs Dashboard",
        tagline: "Cross-department metrics unified in one pane of glass",
        visual: "dashboard",
        nodes: ["HR + Finance + OPS", "Dataflow", "Composite Model", "Row-Level Security", "Report"],
        nodeLabels: ["Sources", "Ingest", "Model", "Security", "Serve"],
        kpis: ["94% SLA", "↓12% Cost", "3 Depts"],
        steps: [
          {
            label: "Sources",
            benefit: "HR, Finance, and Operations data all flow into one place — no more chasing spreadsheets.",
            tech: [
              "Connectors to HRIS, accounting software, and OPS trackers",
              "Each source refreshes on its own schedule independently",
              "Source metadata logged for traceability",
            ],
          },
          {
            label: "Ingest",
            benefit: "Data arrives in Power BI fresh, without anyone having to manually push a file.",
            tech: [
              "Power BI Dataflows with cloud-based transformation",
              "Linked entities reuse shared logic across departments",
              "Refresh failure alerts sent to the data owner",
            ],
          },
          {
            label: "Model",
            benefit: "All departments share one consistent model — so Finance and HR never disagree on headcount.",
            tech: [
              "Composite model combining import and DirectQuery sources",
              "Shared dimension tables (employees, cost centers, dates)",
              "Aggregations pre-calculated for fast cross-department queries",
            ],
          },
          {
            label: "Security",
            benefit: "Each manager sees only their team's data — no accidental exposure of sensitive HR figures.",
            tech: [
              "Dynamic row-level security using username() DAX function",
              "Security roles mapped to Azure AD groups",
              "Tested with role-based view validation before go-live",
            ],
          },
          {
            label: "Serve",
            benefit: "One report, every department — delivered to the right people with the right permissions.",
            tech: [
              "Published to a dedicated Power BI workspace per department",
              "Embedded in the internal portal via Power BI Embedded",
              "Usage analytics tracked to identify unused pages",
            ],
          },
        ],
      },
    ],
  },
];

export const getServiceBySlug = (slug) =>
  SERVICES.find((s) => s.slug === slug) ?? null;
