const mongoose = require("mongoose");
const Joi = require("joi");

const tenatSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 4,
      max: 50,
      required: true,
    },
    phone: {
      type: String,
      min: 4,
      max: 50,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      minlength: 4,
      max: 50,
      default: null,
    },

    status: {
      type: Boolean,
      default: true,
    },

    guarentor: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },
    gender: {
      type: String,
      required: true,
      enum: ["female", "male"],
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Tenant = mongoose.model("Tenant", tenatSchema);

const validate = (tnt) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    email: Joi.string().email().min(4).max(50),
    phone: Joi.string().min(4).max(50).required(),
    status: Joi.boolean(),
    gender: Joi.string().required(),
    createdBy: Joi.objectId().required(),
    guarentor: Joi.objectId().required(),
  });

  return schema.validate(tnt);
};

exports.Tenant = Tenant;
exports.validate = validate;
