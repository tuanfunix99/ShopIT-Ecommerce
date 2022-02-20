const User = require("../models/User");
const log = require("../../utils/logger");
const {
  uploadToCloudinary,
  destroyCloudinary,
} = require("../../utils/cloudinary");
const { Error } = require("mongoose");

exports.getUserFromAdmin = async (req, res) => {
  try {
    const _id = req.body._id;
    const user = await User.findById(_id);
    if (user) {
      throw new Error("User not found");
    }
    res.status(200).send(user);
  } catch (error) {
    log.error({ error: error.message }, "error get user");
    res.status(500).send({ error: error.message });
  }
};

exports.getAllUserFromAdmin = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    log.error({ error: error.message }, "error get all user");
    res.status(500).send({ error: error.message });
  }
};

exports.deleteUserFromAdmin = async (req, res) => {
  try {
    const _id = req.body._id;
    const user = await User.findById(_id);
    if (user) {
      throw new Error("User not found");
    }
    if (user.avatar.public_id) {
      await destroyCloudinary(user.avatar.public_id);
    }
    await User.findByIdAndRemove(_id);
    res.status(200).send(true);
  } catch (error) {
    log.error({ error: error.message }, "error delete user");
    res.status(500).send({ error: error.message });
  }
};
