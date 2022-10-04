const express = require("express");
const auth = require("../middleware/auth");
const validateObjectID = require("../middleware/objectdId");
const validator = require("../middleware/validate");
const { validate, Floor } = require("../models/floor");
const { Apartment } = require("../models/apartment");
const { Unit } = require("../models/unit");

const router = express.Router();

router.get("/", async (req, res) => {
  const floor = await Floor.find({});
  res.send(floor);
});

router.post("/", [validator(validate)], async (req, res) => {
  let floor = await Floor.findOne({ name: req.body.name });
  if (floor) return res.status(400).send("floor already registered");

  const apartment = await Apartment.findOne({ name: req.body.apartmentName });
  if (!apartment) return res.status(404).send("invalid apartment name");

  floor = await Floor.create({
    name: req.body.name,
    apartment: {
      name: apartment.name,
    },
  });

  res.send(floor);
});

router.put(
  "/:id",
  [validateObjectID, validator(validate)],
  async (req, res) => {
    let floor = await Floor.findOne({ name: req.body.name });
    if (floor) return res.status(400).send("floor already registered");

    const apartment = await Apartment.findOne({ name: req.body.apartmentName });
    if (!apartment) return res.status(404).send("invalid apartment name");

    floor = await Floor.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        apartment: {
          name: apartment.name,
        },
      },
      { new: true }
    );

    res.send(floor);
  }
);

// router.delete("/:id", [validateObjectID], async (req, res) => {
//   const floor = await Floor.findByIdAndRemove(req.params.id);
//   await Unit.deleteMany({ floor: { name: floor.name } });

//   res.send(floor);
// });

module.exports = router;
