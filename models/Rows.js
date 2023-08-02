const mongoose = require('mongoose');
const RowsSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
  id: { type: Number, unique: true },
  name: { type: String },
  address: { type: String },
  type: { type: String },
  hives: { type: Number },
  sun: { type: String }
});
module.exports = mongoose.model('rows', RowsSchema);
