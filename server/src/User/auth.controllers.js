const User = require("./model/User");
const log = require("../logger");
const { sendmail } = require("../utils/sendmail");
const jwt = require("jsonwebtoken");
const { uploadToCloudinary } = require("../utils/cloudinary");

require("dotenv").config();

exports.signup = async (req, res) => {
  const errors = {};
  const { username, email, password, avatar } = req.body;
  try {
    const user = await User.create({ username, email, password });
    if (
      avatar.url.trim().length > 0 &&
      avatar.url !== "/images/default_avatar.jpg"
    ) {
      const result = await uploadToCloudinary(avatar.url, "avatars");
      avatar.url = result.url;
      avatar.public_id = result.public_id;
    }
    user.avatar = avatar;
    await user.save();
    const token = user.generateJwtToken("24h");
    await sendmail({ email: user.email, token: token });
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
      errors.system = "Error System";
    }
    log.error({ error: error.message }, "error signup");
    res.status(400).send({ error: errors });
  }
};

exports.activeAccount = async (req, res) => {
  const { token } = req.params;
  try {
    const { _id } = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    const user = await User.findById(_id, "isActive");
    if (!user) {
      throw new Error("User not found");
    }
    if (user.isActive) {
      throw new Error("User actived");
    }
    user.isActive = true;
    await user.save();
    res.redirect("/login");
  } catch (error) {
    log.error({ error: error.message }, "error active account");
    res.status(400).send({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const errors = {};
  req.logout();
  req.session.token = null;
  try {
    const _id = await User.auth(req.body);
    const user = await User.findById(_id);
    const token = user.generateJwtToken("24h");
    req.session.token = token;
    res.status(200).send(true);
  } catch (error) {
    if (error.name === "ValidationError") {
      for (const property in error.errors) {
        errors[property] = error.errors[property].message;
      }
    } else {
      errors.system = "Error System";
    }
    log.error({ error: error.message }, "error login");
    res.status(400).send({ error: errors });
  }
};

exports.logout = async (req, res) => {
  try {
    req.logout();
    req.session.token = null;
    res.redirect("/");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
