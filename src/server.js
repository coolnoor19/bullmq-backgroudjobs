// import express from 'express'

// const app = express()

// app.use(express.json());

// app.get('/', (req,res) =>{
//     return res.status(201).json({message: 'Hello World'})
// })

// app.get('/noor-testing', (req,res)=>{
//     return res.status(201).json({message: 'Hello Noor'})
// })

// app.listen(3009, () => {
//     console.log('Server running on port 3009')
// })

import express from "express";

import {
  addJob,
  getAllJobs
} from "./queue.js";

const app = express();

app.use(express.json());

app.get("/", (req, res)=>{
    return res.status(201).json({message: 'Hello World'})
})

app.post("/tasks", (req, res) => {
  const job = addJob(req.body);

  res.status(202).json({
    message: "Task accepted",
    jobId: job.id,
    status: job.status
  });
});

app.get("/tasks", (req, res) => {
  res.json(getAllJobs());
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// here we are running two node js processes, one for server another for worker, so we could run them simultaneously, and on server all api calls didn't get blocked by worker process because background job processing is done in worker process and it takes computational time.
// one job =[] will not share memory between two processes