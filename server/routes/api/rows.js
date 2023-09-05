const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../../middleware/auth');

const RowsSchema = require('../../../models/Rows');
const User = require('../../../models/User');

// @route    GET api/contacts
// @desc     Get all contacts
// @access   Private
router.get('/rows', auth, async (req, res) => {
  try {
    const contacts = await RowsSchema.find({ user: req.user.is }).sort({
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
// id: { type: Number },
// name: { type: String },
// type: { type: String },
// hives: { type: Number },
// iron: { type: String }
router.post(
  '/rows',
  [
    auth,
    [
      check('name', 'Name is required')
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
    // const { rowsApiary } = req.body;
    const {
      id,
      name,
      hives,
      type,
      sun,
      address,
      lat,
      lng,
      country,
      state,
      city,
      zip,
      forages,
      description
    } = req.body;

    try {
      const newRow = new RowsSchema({
        id,
        name,
        hives,
        type,
        sun,
        address,
        user: req.user.is,
        lat,
        lng,
        country,
        state,
        city,
        zip,
        forages,
        description
      });

      const contact = await newRow.save();

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
router.delete('/rows/:id', auth, async (req, res) => {
  try {
    const contact = await RowsSchema.findById(req.params.id);

    if (!contact) return res.status(404).json({ msg: 'Apiary not found' });

    // Make sure user owns contact
    if (contact.user.toString() !== req.user.is)
      return res.status(401).json({ msg: 'Not authorized' });

    await RowsSchema.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Apiary removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
