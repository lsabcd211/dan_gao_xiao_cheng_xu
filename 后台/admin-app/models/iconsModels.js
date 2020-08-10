var mongoose = require("../config/db.config");
var iconsModels = mongoose.model(
  "icons",
  new mongoose.Schema({
    ImgUrl: String,
    Name: String
  })
);
module.exports = iconsModels;
