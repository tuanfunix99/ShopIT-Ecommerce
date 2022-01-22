const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../User/model/User");

const GOOGLE_CLIENT_ID =
  "377199088831-envk35vop1mkgm78l4kqattcipfjn7p5.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true,
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (user) {
          done(null, user);
        } else {
          const newUser = await User.create({
            email: profile.email,
            username: profile.displayName,
            email: profile.emails[0].value,
            avatar: {
              url: profile.photos[0].value,
            },
            isActive: true,
            googleId: profile.id,
          });
          done(null, newUser);
        }
      } catch (error) {
        if (error.name === "MongoServerError" && error.code === 11000) {
          //"Your email address has been already used. Please try login again."
        } else {
          //"Error system. Please try login again."
        }
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
