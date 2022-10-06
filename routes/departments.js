const express = require("express");
const auth = require("../middleware/auth");
const validateObjectID = require("../middleware/objectdId");
const validator = require("../middleware/validate");
const { validate, Department } = require("../models/department");

const router = express.Router();

router.get("/", async (req, res) => {
  const dept = await Department.find({});
  res.send(dept);
});

router.post("/", [validator(validate)], async (req, res) => {
  let dept = await Department.findOne({ name: req.body.name });
  if (dept) return res.status(400).send("department already registered");

  dept = await Department.create({
    name: req.body.name,
    manager: req.body.manager,
    phone: req.body.phone,
  });

  res.send(dept);
});

router.put(
  "/:id",
  [validateObjectID, validator(validate)],
  async (req, res) => {
    let dept = await Department.findOne({ name: req.body.name });
    if (dept) return res.status(400).send("department already registered");

    dept = await Department.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        manager: req.body.manager,
        phone: req.body.phone,
      },
      { new: true }
    );

    res.send(dept);
  }
);

router.delete("/:id", [validateObjectID], async (req, res) => {
  const dept = await Department.findByIdAndRemove(req.params.id);
  if (!dept) return res.status(404).send("invalid delete");

  res.send(dept);
});

module.exports = router;
