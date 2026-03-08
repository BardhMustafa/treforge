import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval(
  "run AI content agent",
  { days: 2 },
  internal.agent.run,
);

export default crons;
