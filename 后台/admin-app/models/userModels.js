var mongoose = require("../config/db.config");
var usersModels = mongoose.model(
  "users",
  new mongoose.Schema({
    phone: {
      type: String,
      unique: true
    },
    pwd: String,
    nickname: String
  })
);
module.exports = usersModels;
