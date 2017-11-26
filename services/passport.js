const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require("mongoose");
// const keys = require('./config/keys');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
    //  "_id": { "$oid": "5a18f9b65efe240cb1bf8c95" }
});

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null, user);
    })
});

passport.use(new GoogleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback",
    proxy: true
    // Browser -> Heroku Proxy -> Our Server @Heroku
    // Proxy act as the "Load Balancer"
    },
//   }, (accessToken) => {
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id })
    // .then(existingUser => {
            if (existingUser) {
                return done(null, existingUser);
            } 
            const user = await new User({ googleId: profile.id }).save()
            // .then(user => done(null, user));
            done(null, user);
        // });
  }
));