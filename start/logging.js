const { createLogger, transports, format } = require("winston");
const { combine, timestamp, metadata, prettyPrint, json } = format;

module.exports = createLogger({
  format: combine(timestamp(), metadata(), prettyPrint(), json()),
  level: "info",
  transports: [
    new transports.File({
      filename: "errors.log",
      level: "error",
    }),
  ],
});
