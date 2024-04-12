const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    mobile: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    salary: {
      type: Number,
      trim: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: ["Female", "Male", "undefined"],
      default: "undefined",
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    status: {
      type: Boolean,
      default: true,
    },
    isBan: {
      type: Boolean,
      default: false,
    },
    nationalid: {
      type: String,
      trim: true,
      unique: true,
    },
    remark: {
      type: String,
      trim: true,
      unique: true,
      default: null,
    },
    address: {
      lane: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },


  }, { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
