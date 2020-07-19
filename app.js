//handle gaming data
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const keys = require('./config/keys');

await mongoose.connect(keys.MONGO_CONNECT_URI);

app.listen(PORT);
app.use(authRoutes);
