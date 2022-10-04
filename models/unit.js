const mongoose = require("mongoose");
const Joi = require("joi");

const unitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 1,
      required: true,
      unique: true,
    },
    numberOfRooms: {
      type: Number,
      required: true,
      default: 1,
    },
    numberOfKitchens: {
      type: Number,
      required: true,
      default: 1,
    },
    numberOfBathRooms: {
      type: Number,
      required: true,
      default: 1,
    },
    floor: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
        },
      }),
    },

    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Unit = mongoose.model("Unit", unitSchema);

const validate = (floor) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    floorName: Joi.string().min(1).max(50).required(),
    numberOfBathRooms: Joi.number().min(1),
    numberOfKitchens: Joi.number().min(1),
    numberOfRooms: Joi.number().min(1),
    status: Joi.boolean(),
  });

  return schema.validate(floor);
};

exports.Unit = Unit;
exports.validate = validate;
