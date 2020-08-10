/**
 * @apiName 用户注册接口
 * @apiGroup user
 * @api {post} user/reg 用户注册接口
 * @apiDescription 用户注册接口
 * @apiParam { string } phone 用户账号 （必填）
 * @apiParam { string } pwd 用户密码    （必填）
 * @apiParam { string } nickname 用户昵称 （必填）
 * @apiVersion 1.0.0
 * @apiSuccessExample { json } Success-Response
 * { code: "10002", msg: "注册成功", info:{phone:"xxxxx",nickname:"xxxx",_id:"xxx"} }
 * { code: "10001", msg: "用户名已存在" }
 * @apiVersion 1.0.0
 */
/**
 * @apiName 用户登录接口
 * @apiGroup user
 * @api {post} user/login 用户登录接口
 * @apiDescription 用户登录接口
 * @apiParam { string } phone 用户账号 （必填）
 * @apiParam { string } pwd 用户密码    （必填）
 * @apiVersion 1.0.0
 * @apiSuccessExample { json } Success-Response
 * { code: "10001", msg: "账号不存在" }
 * { code: "10002", msg: "密码错误" }
 * { code: "10003", msg: "登录成功", info:{phone:"xxxxx",nickname:"xxxx",_id:"xxx"} }
 * @apiVersion 1.0.0
 */
var express = require("express");
var router = express.Router();
var { index, login, reg } = require("../controllers/userControll");
router.get("/", index);
router.post("/login", login);
router.post("/reg", reg);
module.exports = router;
