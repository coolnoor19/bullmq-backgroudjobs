import { getNextJob } from "./queue.js";
import { generateReport } from "./jobs/report.job.js";

async function processJob() {
  const job = getNextJob();

  if (!job) {
    return;
  }

  console.log("Processing job:", job.id);

  job.status = "active";

  try {
    const result = await generateReport(job.data);

    job.status = "completed";
    job.result = result;

    console.log("Job completed:", job.id);

  } catch (error) {
    job.status = "failed";
    job.error = error.message;

    console.log("Job failed:", job.id);
  }
}

// Check for jobs every second
setInterval(processJob, 1000);

console.log("Worker started...");