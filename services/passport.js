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

passport.use(new GoogleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
    },
//   }, (accessToken) => {
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ googleId: profile.id }).then(existingUser => {
            if (existingUser) {
                done(null, existingUser);
            } else {
                new User({ googleId: profile.id })
                .save()
                .then(user => done(null, user));
            }
        });
  }
));