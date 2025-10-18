const db = require('../db/index')
const bcryptjs = require('bcryptjs')

exports.getUserInfo = (req, res) => {
    const sqlStr = `SELECT id, username, nickname, email, user_pic FROM ev_users WHERE id = ?`
    db.query(sqlStr, req.auth.id, (err, results) => {
        if (err) return res.cc(err.message)
        if (results.length !== 1) return res.cc('获取用户信息失败!')
        res.send({
            status: 0,
            message: '获取用户信息成功!',
            data: results[0]
        })
    })
}
exports.updateUserInfo = (req, res) => {
    const sqlStr = `UPDATE ev_users SET ? WHERE id = ?`
    db.query(sqlStr, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err.message)
        if (results.affectedRows !== 1) return res.cc('更新用户信息失败!')
        res.cc("更新用户信息成功!", 0)
    })
}

exports.updatePassword = (req, res) => {
    const sql = `select * from ev_users where id=?`
    db.query(sql, req.auth.id, (err, results) => {
        if (err) return res.cc(err);
        if (results.length !== 1) return res.cc('用户不存在！')
        const compareResult = bcryptjs.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult) return res.cc('旧密码错误')
        
        const sql = `update ev_users set password=? where id=?`
        const newPwd = bcryptjs.hashSync(req.body.newPwd, 10);
        db.query(sql, [newPwd, req.auth.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新密码失败！')
            res.cc("更新密码成功",0)
        }) 
    })
}

exports.updateAvatar = (req, res) => {
    const sql = `update ev_users set user_pic=? where id=?`
    db.query(sql, [req.body.avatar, req.auth.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) res.cc("更换头像失败！")
        res.cc('更换头像成功！', 0)
    })
}