const mongoose = require('mongoose');
const RowsSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  id: { type: String, unique: true },
  name: { type: String },
  address: { type: String },
  type: { type: String },
  hives: { type: String },
  sun: { type: String },
  lat: { type: String },
  lng: {
    type: String
  },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  zip: { type: String },
  forages: { type: String },
  description: { type: String }
});
module.exports = mongoose.model('rows', RowsSchema);
