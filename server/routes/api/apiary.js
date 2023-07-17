const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();
//get apiarydata
router.get('/', (req, res, next) => {
  res.send('hello');
});
////post apiarydata
//delete apiarydata

module.exports = router;
