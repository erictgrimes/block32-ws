import express from "express";
const router = express.Router();
import {
  getEmployees,
  getEmployeeById,
  getRandomEmployee,
  addEmployee,
} from "../db/employees.js";

router
  .route("/")
  .get((req, res) => {
    const employees = getEmployees();
    res.send(employees);
  })
  .post((req, res) => {
    if (!req.body) return res.status(400).send("Missing body");

    const { name } = req.body;

    if (!name) return res.status(400).send("Name is required");

    const newEmp = addEmployee(name);
    const employee = getEmployees();

    res.status(201).send(employee[employee.length - 1]);
  });

router.route("/random").get((req, res) => {
  const employee = getRandomEmployee();
  res.send(employee);
});

router.route("/:id").get((req, res) => {
  if (!req.params) return res.status(400).send("Missing params");

  const { id } = req.params;

  if (!id) return res.status(400).send("ID is required");

  const employee = getEmployeeById(id);

  if (!employee) return res.status(404).send("Employee not found");

  res.send(employee);
});

export default router;
