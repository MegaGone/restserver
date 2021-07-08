const mongoose = require("mongoose");
require('colors');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('BD Connect'.green);
  } catch (err) {
    console.log(err);
    throw new Error("Error to connect to DB");
  }
};

module.exports = {
  dbConnection,
};
