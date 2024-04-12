const mongoose = require("mongoose");

const planSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      trim: true,
      required: true,
    },
    mbps: {
      type: String,
      trim: true,
      required: true,
    },
    badge: {
      type: String,
      trim: true,
    },
    icon: {
      public_id: {
        type: String,
        default : null,
      },
      url: {
        type: String,
        default : null,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Plan", planSchema);
