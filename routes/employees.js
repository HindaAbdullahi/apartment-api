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

router.post("/", [validator(validate)], async (req, res) => {
  let emp = await Empoloyee.findOne({ phone: req.body.phone });
  if (emp) return res.status(400).send("phone All ready registered");
  emp = Empoloyee({
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    department: req.body.department,
    salary: req.body.salary,
    gender: req.body.gender,
    createdBy: req.body.createdBy,
  });

  const email = req.body.email;
  if (email) {
    emp.email = email;
  }

  await emp.save();
  res.send(emp);
});

router.put(
  "/:id",
  [validateObjectID, validator(validate)],
  async (req, res) => {
    const emp = await Empoloyee.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        department: req.body.department,
        salary: req.body.salary,
        gender: req.body.gender,
        createdBy: req.body.createdBy,
      },
      { new: true }
    );

    res.send(emp);
  }
);

router.delete("/:id", [validateObjectID], async (req, res) => {
  const emp = await Empoloyee.findByIdAndRemove(req.params.id);

  res.send(emp);
});

module.exports = router;
