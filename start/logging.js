const { createLogger, transports, format } = require("winston");
const { combine, timestamp, label, printf, prettyPrint, json } = format;
require("express-async-errors");

const logger = createLogger({
  format: combine(timestamp(), prettyPrint(), json()),
  level: "info",
  transports: [
    new transports.File({
      filename: "errors.log",
      level: "error",
    }),
  ],
});

module.exports = logger;
