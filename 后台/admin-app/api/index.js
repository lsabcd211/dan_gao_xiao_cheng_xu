/**
 * @apiName 首页数据
 * @apiGroup index
 * @api {get} index 获取首页数据
 * @apiDescription 获取首页数据
 * @apiVersion 1.0.0
 */
var express = require("express");
var router = express.Router();
var { index } = require("../controllers/indexControll");
router.get("/", index);
module.exports = router;
