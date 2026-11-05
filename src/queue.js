const jobs = []

export function addJob(data){
 const job = {
    id: Date.now().toString(),
    data,
    status:"waiting",
    createdAt: new Date()
 }

 jobs.push(job);

 console.log("Job added:", job.id);

 return job;
}

export function getNextJob() {
  return jobs.find(job => job.status === "waiting");
}

export function getAllJobs() {
  return jobs;
}