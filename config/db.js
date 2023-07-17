const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = () => {
  // {
  //     useNewURLParser: true,
  //     useCreateIndex: true,
  //     useFindAndModify: false
  //   }
  mongoose
    .connect(db)
    .then(() => console.log('mongo connected'))
    .catch((err) => {
      console.log('err', err, db);
      process.exit(1);
    });
};
module.exports = connectDB;
