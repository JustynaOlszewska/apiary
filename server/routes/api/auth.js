const express = require('express');
const mongodb = require('mongodb');
const User = require('../../../models/User');
const { check, validationResult } = require('express-validator');
const { useRoute } = require('vue-router');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const router = express.Router();
const auth = require('../../../middleware/auth');

//get auth pobieranie danych uzytkownika kryjącego się pod tokenem
// @route    GET api/auth
// @desc     Get logged user
// @access   Private
//get data concrete user with token
router.get('/auth', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.is).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
//logowanie
router.post(
  '/auth',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required'),
  ],
  async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json({ msg: 'Invalid crededentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credientals' });
      }
      //   user = new User({ name, email, password });
      //   const salt = await bcrypt.genSalt(10);
      //   user.password = await bcrypt.hash(password, salt);
      //   await user.save();
      const payload = {
        user: {
          is: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      res.status(500).send('Error server');
    }
  }
);
////post apiarydata
//delete apiarydata

module.exports = router;
