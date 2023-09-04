const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');

const Apiary = require('../../../models/Apiary');
const User = require('../../../models/User');

// @route    GET api/contacts
// @desc     Get all contacts
// @access   Private
router.get('/apiary', auth, async (req, res) => {
  try {
    const contacts = await Apiary.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/contacts
// @desc     Create a contact
// @access   Private
router.post(
  '/apiary',
  [
    auth,
    [
      check('apiary', 'Name is required').not().isEmpty()
      // check('type', 'Type must be personal or professional').isIn([
      //   'personal',
      //   'professional'
      // ])
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { column } = req.body.apiary;

    try {
      const newApiary = new Apiary({
        column,
        user: req.user.id
      });

      const contact = await newApiary.save();

      res.json(contact);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    PUT api/contacts/:id
// @desc     Update a contact
// @access   Private
router.put('/:id', auth, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name, email, phone, type } = req.body;

  // Build contact object
  const contactFields = {};
  if (name) contactFields.name = name;
  if (email) contactFields.email = email;
  if (phone) contactFields.phone = phone;
  if (type) contactFields.type = type;

  try {
    let contact = await Apiary.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Apiary not found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    contact = await Apiary.findByIdAndUpdate(
      req.params.id,
      { $set: contactFields },
      { new: true }
    );

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    DELETE api/contacts/:id
// @desc     Delete a contact
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const contact = await Apiary.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Apiary not found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Not authorized' });

    await Apiary.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Apiary removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
