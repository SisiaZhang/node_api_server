const express = require('express')

const app = express();

// 解决跨域问题
const cors = require('cors')
app.use(cors())


// 解析请求体。这个中间件，只能解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

// 响应数据的中间件
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// 导入并使用 user 路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 错误中间件
const joi = require('joi')
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res.cc(err)
    res.cc(err)
})

app.listen(3007, () => {
    console.log('Server is running on port 3000')
})