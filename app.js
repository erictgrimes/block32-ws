import express from "express";
const app = express();
export default app;

import employeesRouter from "./api/employees.js";

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.use("/employees", employeesRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Something went wrong!");
});

app.route("/").get((req, res) => {
  res.send("Hello employees!");
});
