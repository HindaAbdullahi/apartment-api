const express = require("express");
const auth = require("../middleware/auth");
const validateObjectID = require("../middleware/objectdId");
const validator = require("../middleware/validate");
const { validate, Empoloyee } = require("../models/employee");

const router = express.Router();

router.get("/", async (req, res) => {
  const emp = await Empoloyee.find({});
  res.send(emp);
});

router.post("/", async (req, res) => {
  let emp = await Empoloyee.findOne({ phone: req.body.phone });
  if (emp) return res.status(400).send("phone All ready registered");
  emp = await Empoloyee.create({
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    department: req.body.department,
    salary: req.body.salary,
  });

  res.send(emp);
});

router.put("/:id", [validateObjectID], async (req, res) => {
  const emp = await Empoloyee.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    department: req.body.department,
    salary: req.body.salary,
  });

  res.send(emp);
});

router.delete("/:id", async (req, res) => {
  const emp = await Empoloyee.findByIdAndRemove(req.params.id);

  res.send(emp);
});

module.exports = router;
