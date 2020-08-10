var EventProxy = require("eventproxy");
var ep = new EventProxy();
var bannersModels = require("../models/bannerModels");
var iconsModels = require("../models/iconsModels");
var goodsModels = require("../models/goodsModels");

exports.index = (req, res) => {
  bannersModels.find({}, (err, info) => {
    if (info.length !== 0) {
      ep.emit("banners", info);
    } else {
      ep.emit("banners", []);
    }
  });
  iconsModels.find({}, (err, info) => {
    if (info.length !== 0) {
      ep.emit("icons", info);
    } else {
      ep.emit("icons", []);
    }
  });
  goodsModels.find({}, (err, info) => {
    if (info.length !== 0) {
      ep.emit("goods", info);
    } else {
      ep.emit("goods", []);
    }
  });
  ep.all("banners", "icons", "goods", function(banners, icons, goods) {
    res.json({ banners, icons, goods });
  });
};
