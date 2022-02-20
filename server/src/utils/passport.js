const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const User = require("../User/models/User");
const log = require("./logger");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const email = profile.emails[0].value.split("@")[0] + "@ecommerce.shopIt.com";
        const user = await User.findOne({ passportId: profile.id });
        if (user) {
          done(null, user);
        } else {
          const newUser = await User.create({
            username: profile.displayName,
            email: email,
            avatar: {
              url: profile.photos[0].value,
            },
            isActive: true,
            passportId: profile.id,
          });
          done(null, newUser);
        }
      } catch (error) {
        log.error({ error: error.message }, "Error Passport Google");
      }
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "/auth/facebook/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const id = profile.id + "fb";
        const user = await User.findOne({ passportId: id });
        if (user) {
          done(null, user);
        } else {
          console.log(profile);
          // const newUser = await User.create({
          //   username: "user",
          //   email: id + "@ecommerce.shopIt.com",
          //   avatar: {
          //     url: "/images/default_avatar.jpg",
          //   },
          //   isActive: true,
          //   passportId: id,
          // });
          // done(null, newUser);
        }
      } catch (error) {
        log.error({ error: error.message }, "Error Passport Facebook");
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (userId, done) => {
  const user = await User.findById(userId);
  done(null, user);
});
