var mongoose = require("../config/db.config");
var bannersModels = mongoose.model(
  "banners",
  new mongoose.Schema({
    ImgUrl: String,
    Name: String
  })
);
module.exports = bannersModels;
