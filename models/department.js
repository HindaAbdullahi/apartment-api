const mongoose = require("mongoose");
const Joi = require("joi");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 3,
      required: true,
      unique: true,
    },
    manager: {
      type: String,
      minlength: 1,
      required: true,
    },
    phone: {
      type: String,
      minlength: 3,
      required: true,
    },
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);

const validate = (dept) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    manager: Joi.string().min(3).max(50).required(),
    phone: Joi.string().min(3).max(50).required(),
  });

  return schema.validate(dept);
};

exports.Department = Department;
exports.validate = validate;
