const mongoose = require("mongoose");

const customerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    mobile: {
      type: String,
      trim: true,
      required: true,
    },
    gender: {
      type: String,
      enum: ["female", "male", "others", "undefined"],
      default: "undefined",
    },
    email: {
      type: String,
      trim: true,
      default : null,
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
    },
    remark: {
      type: String,
      trim: true,
    },
    image: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
      },
      country: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("customer", customerSchema);
