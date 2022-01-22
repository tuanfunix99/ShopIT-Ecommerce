const express = require("express");
const cors = require("cors");
const { ProductRoutes, UserRoutes } = require("./index.routes");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const log = require("./logger");
const passport = require("passport");
const cloudinary = require("cloudinary");
const passportSetup = require("./utils/passport");
const path = require("path");

require("dotenv").config();
require("./utils/mongodb");

const PORT = process.env.PORT || 5000;

const store = new MongoDBStore({
  uri: process.env.MONGODB_URL,
  expires: 1000 * 3600 * 24,
});

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "5mb" }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/products", ProductRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
  });
}

app.listen(PORT, () => {
  log.info("Listening on port " + PORT);
});
