const express = require("express");
const auth = require("../middleware/auth");
const validateObjectID = require("../middleware/objectdId");
const validator = require("../middleware/validate");
const { validate, Apartment } = require("../models/apartment");
const { Floor } = require("../models/floor");

const router = express.Router();

router.get("/", async (req, res) => {
  const apartment = await Apartment.find({});
  res.send(apartment);
});

router.post("/", [validator(validate)], async (req, res) => {
  let apartment = await Apartment.findOne({ name: req.body.name });
  if (apartment) return res.status(400).send("apartment all ready registered");
  apartment = await Apartment.create({
    name: req.body.name,
    location: req.body.location,
    address: req.body.address,
  });

  res.send(apartment);
});

router.put(
  "/:id",
  [validateObjectID, validator(validate)],
  async (req, res) => {
    let apartment = await Apartment.findOne({ name: req.body.name });
    if (apartment)
      return res.status(400).send("apartment all ready registered");
    apartment = await Apartment.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        location: req.body.location,
        address: req.body.address,
      },
      { new: true }
    );

    res.send(apartment);
  }
);

router.delete("/:id", [validateObjectID], async (req, res) => {
  const apartment = await Apartment.findByIdAndRemove(req.params.id);
  if (!apartment) return res.status(404).send("invalid delete");
  await Floor.deleteMany({ "apartment.name": apartment.name });

  res.send(apartment);
});

module.exports = router;
