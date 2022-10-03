const logger = require("../start/logging");

module.exports = function (err, req, res) {
  logger.error(err.message, err);
  res.status(500).send("Something failed");
};
