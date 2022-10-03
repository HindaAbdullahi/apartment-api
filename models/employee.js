const mongoose = require("mongoose");
const Joi = require("joi");

const employeeSchema = new mongoose.Schema(
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
    address: {
      type: String,
      minlength: 4,
      max: 50,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      minlength: 4,
      max: 50,
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

const Empoloyee = mongoose.model("Empoloyee", employeeSchema);

const validate = (emp) => {
  const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    email: Joi.string().email().min(4).max(50),
    phone: Joi.string().min(4).max(50).required(),
    address: Joi.string().min(4).max(50).required(),
    salary: Joi.number().required(),
    department: Joi.string().min(4).max(50).required(),
    status: Joi.boolean(),
    gender: Joi.string().required(),
    createdBy: Joi.objectId().required(),
  });

  return schema.validate(emp);
};

exports.Empoloyee = Empoloyee;
exports.validate = validate;
