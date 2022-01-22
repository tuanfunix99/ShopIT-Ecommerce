const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Error } = require("mongoose");
require("dotenv").config();

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "Please enter your username"],
      maxLength: [30, "Your name cannot exceed 30 characters"],
    },
    email: {
      type: String,
      unique: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Please enter a valid email");
        }
      },
    },
    password: {
      type: String,
      trim: true,
      minlength: [6, "Your password must be longer than 6 characters"],
      maxLength: [30, "Your password cannot exceed 30 characters"],
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    googleId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.statics.auth = async ({ email, password }) => {
  let error = new Error.ValidationError();
  const user = await User.findOne({ email: email });
  if (!email) {
    error.errors.email = new Error.ValidatorError({
      message: "Please enter email",
      path: "email",
    });
    throw error;
  }
  if (!password) {
    error.errors.password = new Error.ValidatorError({
      message: "Please enter password",
      path: "password",
    });
    throw error;
  }
  if (!user) {
    error.errors.email = new Error.ValidatorError({
      message: "Email not found",
      path: "email",
    });
    throw error;
  }
  if (!user.isActive) {
    error.errors.email = new Error.ValidatorError({
      message: "Account not active",
      path: "email",
    });
    throw error;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    error.errors.password = new Error.ValidatorError({
      message: "Password not match",
      path: "password",
    });
    throw error;
  }
  return user._id;
};

UserSchema.methods.generateJwtToken = function (time) {
  const user = this;
  const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY, {
    expiresIn: time,
  });
  return token;
};

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
