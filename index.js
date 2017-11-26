const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // not express-session.
const passport = require('passport');
// const passportConfig = require('./services/passport');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');
// const authRoutes = require('./routes/authRoutes');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in millisec.
        keys: [keys.cookieKey]
    })
);
app.use(passport.initialize());
app.use(passport.session());
// console.developers.google.com

// authRoutes(app);
require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT);
// http://server-happitt.c9users.io/
// https://polar-refuge-95075.herokuapp.com/