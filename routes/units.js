const express = require("express");
const auth = require("../middleware/auth");
const validateObjectID = require("../middleware/objectdId");
const validator = require("../middleware/validate");
const { validate, Unit } = require("../models/unit");
const { Floor } = require("../models/floor");

const router = express.Router();

router.get("/", async (req, res) => {
  const unit = await Unit.find({});
  res.send(unit);
});

router.post("/", [validator(validate)], async (req, res) => {
  let unit = await Unit.findOne({ name: req.body.name });
  if (unit) return res.status(400).send("unit already registered");

  const floor = await Floor.findOne({ name: req.body.floorName });
  if (!floor) return res.status(404).send("invalid floor name");

  unit = await Unit.create({
    name: req.body.name,
    floor: {
      name: floor.name,
    },
    numberOfBathRooms: req.body.numberOfBathRooms,
    numberOfKitchens: req.body.numberOfKitchens,
    numberOfRooms: req.body.numberOfRooms,
  });

  res.send(unit);
});

router.put(
  "/:id",
  [validateObjectID, validator(validate)],
  async (req, res) => {
    let unit = await Unit.findOne({ name: req.body.name });
    if (unit) return res.status(400).send("unit already registered");

    const floor = await Floor.findOne({ name: req.body.floorName });
    if (!floor) return res.status(404).send("invalid floor name");

    unit = await Unit.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        floor: {
          name: floor.name,
        },
        numberOfBathRooms: req.body.numberOfBathRooms,
        numberOfKitchens: req.body.numberOfKitchens,
        numberOfRooms: req.body.numberOfRooms,
      },
      { new: true }
    );

    res.send(unit);
  }
);

// router.delete("/:id", [validateObjectID], async (req, res) => {
//   const unit = await Unit.findByIdAndRemove(req.params.id);

//   res.send(unit);
// });

module.exports = router;
