const express = require('express');
const mongoose = require('mongoose');
// const passportConfig = require('./services/passport');
const keys = require('./config/keys');

require('./models/User');
require('./services/passport');
// const authRoutes = require('./routes/authRoutes');

mongoose.connect(keys.mongoURI);

const app = express();

// console.developers.google.com

// authRoutes(app);
require('./routes/authRoutes')(app);


const PORT = process.env.PORT || 5000;
app.listen(PORT);
// http://server-happitt.c9users.io/
// https://polar-refuge-95075.herokuapp.com/