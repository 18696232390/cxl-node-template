const express = require('express');
const router = express.Router();
const apiUtils = require('../../utils/apiUtils')

// 引入service
const userService = require('../service/userService')

/**
    登录方法
 */
router.post('/login',async (req,res)=>{
    console.log(req.body)
    var username = req.body.username;
    var password = req.body.password;
    try {
        userService.login(username,password).then(dbRes=>{
            apiUtils.sendSuccessMsg(res,dbRes)
        })
    } catch (error) {
        apiUtils.sendErrorMsg(res)
    }
})


/** 获取用户列表 */
router.get('/list',async (req, res) => {
    try {
        userService.getUserList().then(dbRes => {
            apiUtils.sendSuccessMsg(res,dbRes)
        })
    } catch (error) {
        apiUtils.sendErrorMsg(res)
    }
})


/** 删除用户 */
router.get('/delete',async (req, res) => {
    var params = req.query
    var id = params.id
     try {
        userService.deleteUser(id).then(dbRes => {
            apiUtils.sendSuccessMsg(res,dbRes,'删除成功')
        })
    } catch (error) {
        apiUtils.sendErrorMsg(res)
    }
})


module.exports = router;


