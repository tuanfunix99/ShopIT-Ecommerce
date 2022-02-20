const mongoose = require('mongoose');
const log = require("./logger");

require("dotenv").config();

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(process.env.MONGODB_URL, options)
  .then(() => {
    log.info("Connected to MongoDB");
  })
  .catch((err) => log.error({error: err.message}, "Error connect MongoDb"));
