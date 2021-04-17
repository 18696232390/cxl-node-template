
// 参考 https://github.com/acexyf/multerDemo

const express = require('express');
const router = express.Router();

// 文件相关
var fs = require('fs');
var multer = require('multer');
var path = require('path');


var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            var changedName = (new Date().getTime()) + '-' + file.originalname;
            cb(null, changedName);
        }
    })
});

//单个文件上传
router.post('/upload/single', upload.single('singleFile'), (req, res) => {
    console.log(req.file);
    res.json({
        code: '0000',
        type: 'single',
        originalname: req.file.originalname
    })
});

//多个文件上传
router.post('/upload/multer', upload.array('multerFile'), (req, res) => {
    console.log(req.files);
    let fileList = [];
    req.files.map((elem) => {
        fileList.push({
            originalname: elem.originalname
        })
    });
    res.json({
        code: '0000',
        type: 'multer',
        fileList: fileList
    });
});


/**
 * 获取本机IP
 * @return {[string]} [IP地址]
 */
function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

module.exports = router;