// import { getNextJob } from "./queue.js";
// import { generateReport } from "./jobs/report.job.js";

// async function processJob() {
//   const job = getNextJob();

//   if (!job) {
//     return;
//   }

//   console.log("Processing job:", job.id);

//   job.status = "active";

//   try {
//     const result = await generateReport(job.data);

//     job.status = "completed";
//     job.result = result;

//     console.log("Job completed:", job.id);

//   } catch (error) {
//     job.status = "failed";
//     job.error = error.message;

//     console.log("Job failed:", job.id);
//   }
// }

// // Check for jobs every second
// setInterval(processJob, 1000);

// console.log("Worker started...");

// import { getNextJob, completeJob , failJob} from "./queue.js";
// import { generateReport } from "./jobs/report.job.js";

// let isProcessing = false;

// async function processJob() {
//   if (isProcessing) return;

//   const job = getNextJob();

//   if (!job) return;

//   isProcessing = true;

//   console.log("\n----------------------------");
//   console.log("JOB PROCESSING STARTED");
//   console.log("Job ID:", job.id);
//   console.log("Status:", job.status);
//   console.log("----------------------------");
  
//    try {
//     const result = await generateReport(job.data);  // call the genreateReport function with job data   

//     completeJob(job.id, result);

//     console.log("JOB COMPLETED:", job.id);
//     console.log("Processing time:", job.processingTime, "ms");

//   } catch (error) {
//     failJob(job.id, error);

//     console.log("JOB FAILED:", job.id);
//     console.log("Error:", error.message);

//   } finally {
//     isProcessing = false;
//   }
// }

// setInterval(processJob, 500);

// console.log("Worker started...");


//now we are adding concurrency to our worker process, so that it can process multiple jobs simultaneously, and we are also adding a delay of 500ms between each job processing to avoid overwhelming the system.


import {
  getNextJob,
  completeJob,
  failJob
} from "./queue.js";

import { generateReport } from "./jobs/report.job.js";

// Maximum simultaneous jobs
const CONCURRENCY = 3;

// Currently running jobs
let activeJobs = 0;

// Process one particular job
async function processJob(job) {
  console.log(
    `[Worker] Started: ${job.id} | Active: ${activeJobs}`
  );

  console.log(
    `[Worker] Report: ${job.data.reportName}`
  );

  try {
    const result = await generateReport(job.data);

    completeJob(job.id, result);

    console.log(
      `[Worker] Completed: ${job.data.reportName}`
    );

  } catch (error) {
    failJob(job.id, error);

    console.log(
      `[Worker] Failed: ${job.data.reportName}`
    );

    console.log(`[Worker] Error: ${error.message}`);

  } finally {
    activeJobs--;

    console.log(
      `[Worker] Active jobs now: ${activeJobs}`
    );
  }
}

// Find and start jobs while capacity is available
function processQueue() {
  while (activeJobs < CONCURRENCY) {
    const job = getNextJob();

    if (!job) {
      break;
    }

    // Reserve a slot before starting asynchronous work
    activeJobs++;

    // Intentionally do not await here
    processJob(job);
  }
}

// Check the queue every 500ms
setInterval(processQueue, 500);

console.log(
  `Worker started | Concurrency: ${CONCURRENCY}`
);
