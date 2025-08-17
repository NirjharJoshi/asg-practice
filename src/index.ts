import express from "express";

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
