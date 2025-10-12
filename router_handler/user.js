


const db = require('../db/index')
const bcryptjs = require('bcryptjs')

exports.reguser = (req, res) => {
    const userinfo = req.body
    const sqlStr = `SELECT * FROM ev_users WHERE username = ?`
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) return res.cc(err.message)
        if (results.length > 0) return res.cc('用户名被占用，请更换其他用户名！')
        userinfo.password = bcryptjs.hashSync(userinfo.password, 10)
        const sqlStr = `INSERT INTO ev_users set ?`
        db.query(sqlStr, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) return res.cc(err.message)
            if (results.affectedRows !== 1) return res.cc('注册失败,请稍后重试！')
            res.cc('注册成功', 0)
        })
    })
}