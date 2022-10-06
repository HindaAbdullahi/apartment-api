const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
require("express-async-errors");
const app = express();

require("./start/config")();
require("./start/db")();
require("./start/routes")(app);

const port = 3000;
app.listen(port, () => {
  console.log(`connected on port ${port}`);
});
