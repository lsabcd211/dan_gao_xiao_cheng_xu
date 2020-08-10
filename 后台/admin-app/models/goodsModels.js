var mongoose = require("../config/db.config");
var goodsModels = mongoose.model(
  "goods",
  new mongoose.Schema({
    ImgUrl: String,
    Name: String,
    Price: Number,
    Size: Number,
    titile: String,
    details: Array
  })
);
module.exports = goodsModels;
