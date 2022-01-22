const User = require("./model/User");
const log = require("../logger");
const {
  uploadToCloudinary,
  destroyCloudinary,
} = require("../utils/cloudinary");
const bcrypt = require("bcrypt");
const { Error } = require("mongoose");

require("dotenv").config();

exports.getUser = (req, res) => {
  res.status(200).send(req.user);
};

exports.updateProfile = async (req, res) => {
  const errors = {};
  const { id, username, email, avatar } = req.body;
  try {
    if (req.user._id != id) {
      throw new Error("User not allowed to update");
    }
    await User.findByIdAndUpdate(
      id,
      { username, email },
      {
        new: true,
        runValidators: true,
      }
    );
    const user = req.user;
    if (avatar.public_id && avatar.url !== user.avatar.url) {
      await destroyCloudinary(avatar.public_id);
      const result = await uploadToCloudinary(avatar.url, "avatars");
      avatar.url = result.url;
      avatar.public_id = result.public_id;
    } else if (
      avatar.url !== user.avatar.url &&
      avatar.url !== "/images/default_avatar.jpg"
    ) {
      const result = await uploadToCloudinary(avatar.url, "avatars");
      avatar.url = result.url;
      avatar.public_id = result.public_id;
    }
    await User.findByIdAndUpdate(
      id,
      { avatar },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send(true);
  } catch (error) {
    if (error.name === "ValidationError") {
      for (const property in error.errors) {
        if (error.errors[property].kind === "unique") {
          continue;
        }
        errors[property] = error.errors[property].message;
      }
    } else if (error.name === "MongoServerError" && error.code === 11000) {
      const property = Object.keys(error.keyPattern)[0];
      errors[property] = `${property} is already taken`;
    } else {
      errors.system = error.message;
    }
    log.error({ error: error.message }, "error signup");
    res.status(400).send({ error: errors });
  }
};

exports.changePassword = async (req, res) => {
  const errors = {};
  const { id, oldPassword, password } = req.body;
  let error = new Error.ValidationError();
  try {
    if (req.user._id != id) {
      throw new Error("User not allowed to update");
    }
    const user = await User.findById(id, "password");
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      error.errors.oldPassword = new Error.ValidatorError({
        message: "Password not match",
        path: "oldPassword",
      });
      throw error;
    }
    if (password.trim().length < 6) {
      error.errors.password = new Error.ValidatorError({
        message: "Your password must be longer than 6 characters",
        path: "password",
      });
      throw error;
    }
    if (password.trim().length > 30) {
      error.errors.password = new Error.ValidatorError({
        message: "Your password cannot exceed 30 characters",
        path: "password",
      });
      throw error;
    }
    user.password = password;
    await user.save();
    res.status(200).send(true);
  } catch (error) {
    if (error.name === "ValidationError") {
      for (const property in error.errors) {
        if (error.errors[property].kind === "unique") {
          continue;
        }
        errors[property] = error.errors[property].message;
      }
    } else {
      errors.system = error.message;
    }
    log.error({ error: error.message }, "error signup");
    res.status(400).send({ error: errors });
  }
};
