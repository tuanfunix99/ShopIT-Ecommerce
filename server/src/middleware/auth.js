const User = require("../User/models/User");
const log = require("../utils/logger");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.authenticate = async (req, res, next) => {
  try {
    if (!req.user) {
      const token = req.session.token;
      if (!token) {
        throw new Error("Session has expired");
      }
      const { _id } = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      const user = await User.findById(_id);
      if (!user) {
        throw new Error("User not found");
      }
      if (!user.isActive) {
        throw new Error("User not active");
      }
      req.user = user;
    }
    next();
  } catch (error) {
    log.error({ error: error.message }, "Error auth user");
    res.status(500).send({ error: error.message });
  }
};

exports.authorizaRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(500).send("User not allowed to access this resource");
    }
    next();
  };
};
