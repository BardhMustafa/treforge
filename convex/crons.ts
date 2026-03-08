import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "run AI content agent",
  { hours: 48 },
  internal.agent.run,
);

export default crons;
