const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('../config/db');
const app = express();
connectDB();
app.use(express.json({ extended: false }));
const host = 'http://localhost';
const apiary = require('./routes/api/apiary');
const auth = require('./routes/api/auth');
const users = require('./routes/api/users');
const rows = require('./routes/api/rows');

//middelware
app.use(bodyParser.json());
app.use(cors());
const port = process.env.port || 5000;
app.use('/api/apiary', apiary);
app.use('/api/apiary', auth);
app.use('/api/apiary', users);
app.use('/api/apiary', rows);

// We'll use the public directory to serve the Vue App
// app.use(express.static('public'));

app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`);
});
