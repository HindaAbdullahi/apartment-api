const express = require("express");
const error = require("../middleware/error");
const employees = require("../routes/employees");
const tenants = require("../routes/tenants");
const apartments = require("../routes/aparments");
const floors = require("../routes/floors");
const units = require("../routes/units");
const departments = require("../routes/departments");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/employees", employees);
  app.use("/api/tenants", tenants);
  app.use("/api/apartments", apartments);
  app.use("/api/floors", floors);
  app.use("/api/units", units);
  app.use("/api/departments", departments);
  app.use(error);
};
