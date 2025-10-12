const express = require('express')
const userHandler = require('../router_handler/user')
const router = express.Router()
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')

// 注册新用户
router.post('/reguser', expressJoi(reg_login_schema), userHandler.reguser)

module.exports = router