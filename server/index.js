const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const host = 'http://localhost';
const apiary = require('./routes/api/apiary');
const auth = require('./routes/api/auth');

//middelware
app.use(bodyParser.json());
app.use(cors());
const port = process.env.port || 5000;
app.use('/api/apiary', apiary);
app.use('/api/auth', auth);

// We'll use the public directory to serve the Vue App
// app.use(express.static('public'));

app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`);
});
