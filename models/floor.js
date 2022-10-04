const mongoose = require("mongoose");
const Joi = require("joi");

const floorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 1,
      required: true,
      unique: true,
    },
    apartment: {
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

const Floor = mongoose.model("Floor", floorSchema);

const validate = (floor) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    apartmentName: Joi.string().min(1).max(50).required(),
    status: Joi.boolean(),
  });

  return schema.validate(floor);
};

exports.Floor = Floor;
exports.validate = validate;
