const mongoose = require("mongoose");
const Joi = require("joi");

const apartmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 4,
      max: 50,
      required: true,
      unique: true,
    },

    address: {
      type: String,
      minlength: 4,
      max: 50,
      required: true,
    },
    location: {
      type: String,
      minlength: 4,
      max: 50,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Apartment = mongoose.model("Apartment", apartmentSchema);

const validate = (emp) => {
  const schema = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    address: Joi.string().min(4).max(50).required(),
    location: Joi.string().min(4).max(50).required(),
    status: Joi.boolean(),
  });

  return schema.validate(emp);
};

exports.Apartment = Apartment;
exports.validate = validate;
