const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');

require('./db');

app.use(express.json());


app.use('/api', bookRoutes);
app.use('/api', userRoutes);

module.exports = app;
