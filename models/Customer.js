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
