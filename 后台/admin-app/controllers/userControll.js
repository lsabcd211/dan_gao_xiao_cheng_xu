var EventProxy = require("eventproxy");
var userModels = require("../models/userModels");

exports.index = (req, res) => {
  res.send("OK11");
};
exports.login = (req, res) => {
  var phone = req.body.phone;
  userModels.find({ phone }, (err, info) => {
    if (info.length === 0) {
      res.json({ code: "10001", msg: "账号不存在" });
    } else if (info.length !== 0) {
      console.log(info[0].pwd);
      console.log(req.body.pwd);
      if (info[0].pwd !== req.body.pwd) {
        res.json({ code: "10002", msg: "密码错误" });
      } else {
        var info = {
          phone: info[0].phone,
          nickname: info[0].nickname
        };
        res.json({ code: "10003", msg: "登录成功", info });
      }
    }
  });
};
exports.reg = (req, res) => {
  userModels.create(req.body, (err, info) => {
    if (err) {
      res.json({ code: "10001", msg: "用户名已存在" });
    } else {
      delete info.upwd;
      res.json({ code: "10002", msg: "注册成功", info });
    }
  });
};
