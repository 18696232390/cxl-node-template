var startTime = new Date()
var express = require('express')
var app = express(); //创建express的实例
var expressWs = require('express-ws')(app);

const cors = require('cors');
const bodyParser = require('body-parser');


// ⚡ 基本配置
const baseConfig = require('./config/baseConfig')
// ⚡ 接口工具，用于统一返回接口
const apiUtils = require('./utils/apiUtils')
// ⚡ 实体工具，生成UUID
const entityUtils = require('./utils/entityUtils')
// ⚡ 数据库工具
const dbUtils = require('./utils/dbUtils')
// ⚡ elasticSearch工具
const esUtils = require('./utils/esUtils')
// ⚡ redis工具
const redisUtils = require('./utils/redisUtils');
// ⚡ 业务常量
const bizConst = require('./src/constant/bizConst')



app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors())

// service
const userService = require('./src/service/userService');


var data = {
    result: null
}

function mounted() {

    dbUtils.initConnect()
    redisUtils.initConnect()
    esUtils.initConnect()
    
    console.log('[APP.js]挂载--- userService === ', userService)
}
mounted()

app.all("/*", function (req, res, next) {
    // 跨域处理
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next(); // 执行下一个路由
})



// defalt api 
app.get('/', function (req, res) {
    // console.log('req=',req)
    apiUtils.sendSuccessMsg(res, {
        list: [{
                title: '⚡ cxl-node-template 快速开发脚手架 ⚡'
            },
            {
                version: 'V1.0.0',
                "lastUpdate": "2021年4月17日20:23:23"
            },
            {
                "Q&A": "18696232390@163.com"
            }
        ],
        name: '启动成功！'
    }, '请求成功')
});



// 统一文件接口
app.use('/file', require(__dirname + '/src/api/fileApi'));

// 用户相关接口
app.use('/user', require(__dirname + '/src/api/userApi'));





app.ws('/ws', (ws, req) => {
    ws.send('websocket-连接成功!')
    ws.on('message', function (msg) {
        // 业务代码
        console.log('ws接收到消息=',msg)
        ws.send(msg)
    })
})


// MAIN
var server = app.listen(baseConfig.port, function () {
    console.log('\033[31m ----------接口启动完成--------------- \033[39m')
    console.log("[main] Server running at " + baseConfig.port + " port");
    console.log("[main] Server WebSocket running at ws://127.0.0.1:" + baseConfig.port + "/ws")
    console.log('\033[31m ---------------------------------------- \033[39m')
    console.log('\033[42;30m DONE \033[40;32m Compiled successfully in '+((new Date())-startTime)+'ms \033[m')
});

