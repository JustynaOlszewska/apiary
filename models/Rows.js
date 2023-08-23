const mongoose = require('mongoose');
const RowsSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  id: { type: Number, unique: true },
  name: { type: String },
  address: { type: String },
  type: { type: String },
  hives: { type: Number },
  sun: { type: String },
  lat: { type: Number },
  lng: {
    type: Number
  },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  zip: { type: String },
  address: { type: String },
  name: { type: String },
  forages: { type: String },
  type: { type: String },
  sun: { type: String },
  description: { type: String }
});
module.exports = mongoose.model('rows', RowsSchema);
