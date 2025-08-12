const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      index: true,
      required: true,
      minLength: 4,
      maxLength: 40,
    },

    lastName: {
      type: String,
    },
    email: {
      unique: true,
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email not valid");
        }
      },
    },

    password: {
      type: String,
    },

    age: {
      type: Number,
    },

    gender: {
      type: String,
      validate(value) {
        if (!["Male", "Female","Trans", "Others"].includes(value)) {
          throw new Error("Gender not Valid");
        }
      },
    },

    skills: {
      type: [String],
    },

    photoUrl: {
      type: String,
    },

    about: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.getJWT = async function () {
  const user = this;
  console.log("ye user hai...");
  console.log(user);
  const token = await jwt.sign({ _id: user._id },process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (passwordbyUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(passwordbyUser, passwordHash);
  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
