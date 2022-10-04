const express = require("express");
const auth = require("../middleware/auth");
const validateObjectID = require("../middleware/objectdId");
const validator = require("../middleware/validate");
const { validate, Tenant } = require("../models/tenant");

const router = express.Router();

router.get("/", async (req, res) => {
  const tenant = await Tenant.find({});
  res.send(tenant);
});

router.post("/", [validator(validate)], async (req, res) => {
  let tenant = await Tenant.findOne({ phone: req.body.phone });
  if (tenant) return res.status(400).send("phone All ready registered");
  tenant = Tenant({
    name: req.body.name,
    phone: req.body.phone,
    guarentor: req.body.guarentor,
    gender: req.body.gender,
    createdBy: req.body.createdBy,
  });

  const email = req.body.email;
  if (email) {
    tenant.email = email;
  }

  await tenant.save();
  res.send(tenant);
});

router.put(
  "/:id",
  [validateObjectID, validator(validate)],
  async (req, res) => {
    const tenant = await Tenant.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        phone: req.body.phone,
        guarentor: req.body.guarentor,
        gender: req.body.gender,
        createdBy: req.body.createdBy,
      },
      { new: true }
    );

    res.send(tenant);
  }
);

router.delete("/:id", [validateObjectID], async (req, res) => {
  const tenant = await Tenant.findByIdAndRemove(req.params.id);

  res.send(tenant);
});

module.exports = router;
