// 1.连接数据库文件
const mongoose = require("mongoose");
//2.本地数据库地址,连接到库
var dbUrl = "mongodb://localhost:27017/test";
// 3.连接数据库在
mongoose.connect(dbUrl, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("db_connect_success");
  }
});
module.exports = mongoose;
