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
      unique: true,
      required: true,
    },
    mobile: {
      type: String,
      trim: true,
      unique: true,
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
    role: {
      type: String,
      trim : true,
      default: 'staff',
    },
    gender: {
      type: String,
      enum: ["female", "male", "undefined"],
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
    documents: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
    remark: {
      type: String,
      trim: true,
      default: null,
    },
    isBan: {
      type: Boolean,
      default: false,
    },
    isActivate: {
      type: Boolean,
      default: false,
    },
    addedBy : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      province: {
        type: String,
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

module.exports = mongoose.model("User", userSchema);
