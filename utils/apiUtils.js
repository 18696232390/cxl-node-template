const baseConfig = require('../config/baseConfig')

// init
function mounted () {
}
mounted()

const httpStatusEnums = {
    SUCCESS: '1', // 请求成功
    ERROR:'-1', // 请求失败
}

var apiUtils = {
    sendSuccessMsg : (res,data,msg) =>  {
        res.send(apiUtils.buildMsg(data,msg,'SUCCESS'))
    },
    sendErrorMsg: (res, data, msg) => {
       res.send(apiUtils.buildMsg(data,msg,'ERROR'))
    },
    buildMsg: (data, msg, type) => {
        if (type === 'SUCCESS') {
            const res = {
                code: httpStatusEnums.SUCCESS,
                msg: msg || '调用接口成功',
                data: data || null,
                request_time: new Date().getTime()
            }
            return res;
        } else if (type === 'ERROR') {
            const res = {
                code: httpStatusEnums.ERROR,
                msg: msg || '调用接口失败',
                data: data || null,
                request_time: new Date().getTime()
            }
            return res;
        }
    }
}









module.exports = apiUtils