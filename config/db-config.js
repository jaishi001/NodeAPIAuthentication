const mongoose = require("mongoose");
const url = "mongodb://localhost:27017";
const dbName = "authDb";
const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connectDB = function () {
  return new Promise(function (resolve, reject) {
    mongoose
      .connect(`${url}/${dbName}`, dbOptions)
      .then((con) => {
        if (con) {
          resolve(console.log("MONGODB CONNECTED SUCCESSFULLY!".bgGreen.bold));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
module.exports = connectDB;
