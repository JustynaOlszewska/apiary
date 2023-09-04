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
        // _id: { type: String }
      }
    ]
    // rows: [
    //   {
    //     id: { type: Number },
    //     name: { type: String },
    //     calories: { type: Number },
    //     fat: { type: Number },
    //     type: { type: String },
    //     protein: { type: Number },
    //     hives: { type: Number },
    //     calcium: { type: String },
    //     iron: { type: String }
    //   }
    // ]
  }
});
module.exports = mongoose.model('apiary', ApiarySchema);
