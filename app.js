//handle gaming data
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const google = require('./auth/strategies/google');
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const cors = require('cors');


//allow cross origin for development
app.use(cors());

app.use(express.static(__dirname + '/public'));
//stuff the user session in the cookie
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000, 
  keys: [keys.COOKIE_KEY]
}))
app.use(passport.initialize());
app.use(passport.session());

//if something went wrong, try reconnecting
const run = async () => {
    await mongoose.connect(keys.MONGO_CONNECT_URI, {
      autoReconnect: true,
      reconnectTries: 1000000,
      reconnectInterval: 3000
    })
    
  }
  
run().catch(error => console.error(error))

app.listen(PORT);
app.use(authRoutes);
