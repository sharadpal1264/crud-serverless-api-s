require('dotenv').config();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
let mongoose = require('mongoose');

const User = mongoose.model('User');

//Google Stratgey
passport.use(
  new GoogleStrategy(
    {
      // options for strategy
      callbackURL: 'https://svfrzvhli1.execute-api.ap-south-1.amazonaws.com/dev/google/callback',
      clientID: '1013984577063-q5i5pcqu91608jdgjivgvq0iaia6v8qa.apps.googleusercontent.com',
      clientSecret: 'JA_h5PghtxzkrE9LVWJjXoYE'
    },
    async (accessToken, refreshToken, profile, done) => {
      const profileID = profile.id;
      const email = profile.emails[0].value;
      const fullname=profile.displayName;
      const picture=profile.photos[0].value;

      // check if user already exists
      const currentUser = await User.findOne({ googleId: profileID });
      if (currentUser) {
        // already have the user -> return (login)
        return done(null, currentUser);
      } else {
        // register user and return
        const newUser = await new User({ email: email, googleId: profileID, fullname:fullname, picture:picture}).save();
        return done(null, newUser);
      }
    }
  )
);
