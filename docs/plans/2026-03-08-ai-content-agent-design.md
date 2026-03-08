# AI Content Agent — Design Document

**Date:** 2026-03-08
**Project:** Treforge
**Status:** Approved

---

## Overview

An AI-powered content agent integrated into Treforge that monitors configurable sources for AI news, generates short article drafts (150–300 words) for review, and posts approved articles to Twitter. Everything runs inside Convex — no external services needed beyond APIs.

---

## Data Model

### `sources`
Configurable list of URLs/feeds to monitor.

| Field | Type | Notes |
|---|---|---|
| `name` | string | Display name |
| `url` | string | Feed URL or page URL |
| `type` | `"rss" \| "scrape" \| "twitter"` | Source type |
| `enabled` | boolean | Toggle without deleting |
| `lastCheckedAt` | number | Timestamp of last fetch |

### `sourceItems`
Raw items fetched from sources, deduplicated by URL.

| Field | Type | Notes |
|---|---|---|
| `sourceId` | Id<"sources"> | Parent source |
| `url` | string | Item URL (unique) |
| `title` | string | Item title |
| `content` | string | Raw text/excerpt |
| `fetchedAt` | number | Timestamp |
| `processed` | boolean | Whether draft generation was attempted |

### `drafts`
Generated article drafts awaiting review.

| Field | Type | Notes |
|---|---|---|
| `sourceItemId` | Id<"sourceItems"> | Source item that generated this draft |
| `title` | string | Draft title |
| `body` | string | 150–300 word summary/take |
| `tweetDraft` | string | 1–2 sentence tweet |
| `status` | `"pending" \| "approved" \| "rejected"` | Review status |
| `publishedAt` | number \| null | Set when approved |
| `tweetStatus` | `"pending" \| "approved" \| "posted"` | Twitter publish status |

### `agentRuns`
Log of each scheduled run.

| Field | Type | Notes |
|---|---|---|
| `startedAt` | number | Run start timestamp |
| `completedAt` | number \| null | Run end timestamp |
| `itemsFetched` | number | New source items found |
| `draftsGenerated` | number | Drafts created |
| `error` | string \| null | Error message if failed |

---

## Agent Flow

The Convex cron fires every 2 days and runs three steps:

### Step 1 — Fetch (`convex/agent.ts`)
- Iterates all enabled sources
- **RSS:** parses feed via `rss-parser`, extracts items not already in `sourceItems`
- **Scrape:** fetches HTML via `fetch()`, extracts links/text via `cheerio`
- **Twitter:** calls Twitter v2 API for recent tweets from configured accounts
- Saves new items to `sourceItems` with `processed: false`

### Step 2 — Filter + Generate (per item)
- Calls Claude API (`claude-sonnet-4-6`) with prompt:
  > "Is this relevant and interesting AI news? If yes, write a 150–300 word personal take on it. Also write a 1–2 sentence tweet. If not interesting, respond with SKIP."
- On non-SKIP response: saves draft to `drafts` with `status: pending`
- Marks `sourceItem.processed = true`

### Step 3 — Notify
- After all items processed, sends email via Resend:
  > "X new drafts are ready for your review" + link to `/admin/drafts`

---

## Admin Panel

### `/admin/sources` — Sources Manager
- List all sources with enable/disable toggle
- Add Source form: name, URL, type
- Delete source
- Shows `lastCheckedAt` and item count

### `/admin/drafts` — Drafts Manager
- List drafts with status badges (pending / approved / rejected)
- Detail view per draft:
  - Editable article body
  - Editable tweet draft
  - **Approve** / **Reject** buttons
- Approving sets `status: approved` and `publishedAt`
- Separate **Post Tweet** button sets `tweetStatus: posted` and calls Twitter API

### `/admin/agent-runs` — Run Log
- Table of all agent runs: date, items fetched, drafts generated, errors

---

## Technical Integration

| Concern | Solution |
|---|---|
| LLM | Claude API via `@anthropic-ai/sdk`, model `claude-sonnet-4-6` |
| Scheduling | Convex cron — `crons.interval("run agent", { days: 2 }, ...)` |
| RSS parsing | `rss-parser` npm package |
| HTML scraping | `cheerio` npm package |
| Email | Resend (free tier) |
| Twitter posting | Twitter API v2 — `POST /2/tweets` with OAuth 2.0 |

### Environment Variables (Convex)
- `ANTHROPIC_API_KEY`
- `TWITTER_API_KEY`
- `TWITTER_API_SECRET`
- `TWITTER_ACCESS_TOKEN`
- `TWITTER_ACCESS_TOKEN_SECRET`
- `RESEND_API_KEY`

---

## Out of Scope
- Auto-publishing articles without review
- Auto-posting tweets without review
- Mobile push notifications (email only)
