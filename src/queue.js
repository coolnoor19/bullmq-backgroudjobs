// const jobs = []

// export function addJob(data){
//  const job = {
//     id: Date.now().toString(),
//     data,
//     status:"waiting",
//     createdAt: new Date()
//  }

//  jobs.push(job);

//  console.log("Job added:", job.id);

//  return job;
// }

// export function getNextJob() {
//   return jobs.find(job => job.status === "waiting");
// }

// export function getAllJobs() {
//   return jobs;
// }

import { randomUUID  } from "node:crypto"
const jobs = [];

export function addJob(data) {
    const now = new Date();
  const job = {
    id: randomUUID(),
    data,
    status: "waiting",
    attemptsMade: 0,

    result: null,
    error: null,
    createdAt: now,

    startedAt: null,
    completedAt: null,
    failedAt: null,

    updatedAt: now,
    processingTime: null
  };

  jobs.push(job);

  console.log("Job added:", job.id);

  return job;
}

export function getNextJob() {
  const job = jobs.find(
    job => job.status === "waiting"
  );

  if (!job) return null;

   // Claim the job immediately
  job.status = "active";
  job.startedAt = new Date();
  job.updatedAt = new Date();

  return job;
}

export function completeJob(jobId, result) {
  const job = jobs.find(job => job.id === jobId);

  if (!job) return null;

  const now = new Date();

  job.status = "completed";
  job.result = result;
  job.completedAt = now;
  job.updatedAt = now;

  job.processingTime =
    now.getTime() - job.startedAt.getTime();

  return job;
}

export function failJob(jobId, error) {
  const job = jobs.find(job => job.id === jobId);

  if (!job) return null;

  const now = new Date();

  job.status = "failed";
  job.error = error.message;
  job.failedAt = now;
  job.updatedAt = now;

  job.processingTime =
    now.getTime() - job.startedAt.getTime();

  return job;
}

export function getJobById(jobId) {
  return jobs.find(job => job.id === jobId) || null;
}

export function getAllJobs(status) {
    if(!status)
        return jobs;

    return jobs.filter(job => job.status === status);
}

export function getJobStats() {
  return {
    total: jobs.length,
    waiting: jobs.filter(j => j.status === "waiting").length,
    active: jobs.filter(j => j.status === "active").length,
    completed: jobs.filter(j => j.status === "completed").length,
    failed: jobs.filter(j => j.status === "failed").length
  };
}