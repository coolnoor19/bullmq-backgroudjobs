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

import { getNextJob, completeJob , failJob} from "./queue.js";
import { generateReport } from "./jobs/report.job.js";

let isProcessing = false;

async function processJob() {
  if (isProcessing) return;

  const job = getNextJob();

  if (!job) return;

  isProcessing = true;

  console.log("\n----------------------------");
  console.log("JOB PROCESSING STARTED");
  console.log("Job ID:", job.id);
  console.log("Status:", job.status);
  console.log("----------------------------");
  
   try {
    const result = await generateReport(job.data);  // call the genreateReport function with job data   

    completeJob(job.id, result);

    console.log("JOB COMPLETED:", job.id);
    console.log("Processing time:", job.processingTime, "ms");

  } catch (error) {
    failJob(job.id, error);

    console.log("JOB FAILED:", job.id);
    console.log("Error:", error.message);

  } finally {
    isProcessing = false;
  }
}

setInterval(processJob, 500);

console.log("Worker started...");