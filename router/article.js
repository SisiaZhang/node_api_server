const express = require('express')
const router = express.Router()
const { addArticle } = require('../router_handler/article')



router.post('/add', addArticle)

module.exports = router