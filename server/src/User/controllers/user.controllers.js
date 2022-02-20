const User = require("../models/User");
const log = require("../../utils/logger");
const bcrypt = require("bcrypt");
const {
  uploadToCloudinary,
  destroyCloudinary,
} = require("../../utils/cloudinary");
const { Error } = require("mongoose");
const { handleValidationError, handleMongoServerErrorUnique } = require("../../utils/error");

require("dotenv").config();

exports.getUser = (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    log.error({ error: error.message }, "error get user");
    res.status(500).send({ error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  let errors = {};
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
      erros = handleValidationError(error, errors);
    } else if (error.name === "MongoServerError" && error.code === 11000) {
      errors = handleMongoServerErrorUnique(error, errors);
    } else {
      errors.system = error.message;
    }
    log.error({ error: errors }, "error update profile");
    res.status(400).send({ error: errors });
  }
};

exports.changePassword = async (req, res) => {
  let errors = {};
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
     erros = handleValidationError(error, errors);
    } else {
      errors.system = error.message;
    }
    log.error({ error: errors }, "error change password");
    res.status(400).send({ error: errors });
  }
};
