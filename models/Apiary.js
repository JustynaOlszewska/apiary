const mongoose = require('mongoose');
const ApiarySchema = mongoose.Schema({
  apiary: {
    columns: [
      {
        name: { type: String },
        required: { type: Boolean },
        label: { type: String },
        align: { type: String },
        field: { type: String }
      }
    ]
  }
});
module.exports = mongoose.model('apiary', ApiarySchema);
