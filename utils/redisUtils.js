// https: //segmentfault.com/a/1190000015882650
var redis = require('redis')
const baseConfig = require('../config/baseConfig')
// 使用单例模式进行获取客户端
var redisClient = null

var redisUtils = {}

// 初始化连接
redisUtils.initConnect = () => {
    if (baseConfig.redis.isOpen) {
        if (redisClient) {
            console.log('Redis已经创建过了!')
        } else {
            redisClient = redis.createClient(baseConfig.redis.port, baseConfig.redis.ip)
            redisClient.on('error', function (err) {
                console.log('Redis连接失败！ Error ' + err);
            });
            console.log('\033[42;30m 模块-Redis \033[40;32m Starting successfully \033[m')
        }
    } else {
        console.log('\033[42;40m 模块-Redis \033[40;33m 尚未开启redis功能 \033[m')
    }
}

redisUtils.get = (key) => {
    return new Promise((resolve, reject) => {
        if (baseConfig.redis.isOpen) {
            if (!redisClient) {
                console.log('redis尚未初始化!')
            } else {
                redisClient.get(key, (err, v) => {
                    if (err) throw err;
                    resolve(v);
                })
            }
        } else {
            console.warn('尚未开启redis功能')
            resolve(null);
        }
    })
     
}


redisUtils.set = (key, value) => {
    if (baseConfig.redis.isOpen) {
        if (!redisClient) {
            console.log('redis尚未初始化!')
        } else {
            redisClient.set(key,value,redis.print)
        }
    } else {
        console.warn('尚未开启redis功能')
        return null;
    }
}


redisUtils.del = (key) => {
     if (baseConfig.redis.isOpen) {
         if (!redisClient) {
             console.log('redis尚未初始化!')
         } else {
             if (redisClient.exists(key)) {
                 redisClient.del(key)
                 console.log('redis ==> 删除成功 = '+ key)
             } else {
                 console.warn('redis ==> 关于key='+key+'尚未存在！ ')
             }
             
         }
     } else {
         console.warn('尚未开启redis功能')
         return null;
     }
}



module.exports = redisUtils