import cluster from "node:cluster";
import os from "node:os";
import express from "express";

const numOfCpus = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`machine has total number of cpus: ${numOfCpus}`);
  console.log(`Primary ${process.pid} is running`);
  // numOfCpus - 2
  for (let i = 1; i <= numOfCpus; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} is died`);
    console.log("starting new worker");
    cluster.fork();
  });
} else {
  const PORT = 8000;
  const app = express();

  app.get("/first", async (req, res, next) => {
    return res.status(200).json({
      message: `response from first route handled by worker ${process.pid}`,
    });
  });

  app.get("/second", async (req, res, next) => {
    return res.status(200).json({
      message: `response from second route handled by worker ${process.pid}`,
    });
  });

  app.listen(PORT, () => {
    console.log(`app listening on port: ${PORT}`);
  });

  console.log(`worker ${process.pid} started`);
}
