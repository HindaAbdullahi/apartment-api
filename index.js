const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const config = require("config");
const error = require("./middleware/error");
const employees = require("./routes/employees");
const tenants = require("./routes/tenants");
const apartments = require("./routes/aparments");
const floors = require("./routes/floors");
const units = require("./routes/units");

const app = express();

app.use(express.json());

if (!config.get("db") || !config.get("jwtPrivateKey")) {
  throw new Error("FATAL ERROR: jwtPrivateKey or db is not defined.");
}

mongoose
  .connect(config.get("db"))
  .then(() => console.log("connected hrm db"))
  .catch(() => console.log("error"));

app.use("/api/employees", employees);
app.use("/api/tenants", tenants);
app.use("/api/apartments", apartments);
app.use("/api/floors", floors);
app.use("/api/units", units);
app.use(error);

const port = 3000;

app.listen(port, () => {
  console.log(`connected on port ${port}`);
});
