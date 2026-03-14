# Node Expand Panel Design

**Date:** 2026-03-14

## Overview

Make each node in `PipelineDiagram` clickable. Clicking a node toggles an expand panel below the diagram inside the `ProductShowcase` card. The panel shows a business benefit sentence and tech detail bullets. Only one node can be open at a time.

## Interaction

- Hover: node box gets a subtle `#00ffb4` border glow, cursor becomes pointer
- Click: panel opens below diagram; active node gets solid `#00ffb4` border
- Click same node again: panel collapses
- Click different node: panel switches to new node's content
- Panel transitions smoothly (height animation)

## Expand Panel Content

```
[ STEP_01 — INGEST ]

"Your data arrives here instantly — no batch delays."   ← benefit (1 sentence, white)

◇ Kafka 3.x, partitioned by event type                 ← tech bullets (#00ffb4)
◇ Handles 50k+ events/sec with zero data loss
◇ Dead-letter queue for failed messages
```

## Data Structure

Add `steps` array to each product entry in `src/data/services.js`. One step per node, in the same order as `nodes` / `nodeLabels`:

```js
steps: [
  {
    label: "Ingest",
    benefit: "Your data arrives instantly — no batch delays, no waiting.",
    tech: [
      "Kafka 3.x, partitioned by event type",
      "Handles 50k+ events/sec with zero data loss",
      "Dead-letter queue for failed messages",
    ],
  },
  // ... one per node
]
```

## Component Changes

- **`PipelineDiagram`** — accept `activeStep` (index | null) and `onStepClick` (fn) props. Apply hover/active styles to node rects. Make nodes clickable via SVG `onClick`.
- **`ProductShowcase`** — own `activeStep` state. Pass `activeStep` and `onStepClick` down to `PipelineDiagram` (and `DashboardMockup` which delegates to `PipelineDiagram`). Render `<StepPanel>` below the diagram when `activeStep !== null`.
- **`StepPanel`** (new) — renders the expand panel: step label header, benefit paragraph, tech bullet list. Receives `step` object and `index`.

## Non-Goals

- No modal overlays
- No animations beyond a simple opacity/height transition
- No deep-linking to a specific step
