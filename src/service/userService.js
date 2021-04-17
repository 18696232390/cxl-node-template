const dbUtils = require('../../utils/dbUtils')
const redisUtils = require('../../utils/redisUtils')
const baseConfig = require('../../config/baseConfig')
const bizConst = require('../constant/bizConst')

// init
function mounted() {
    // 初始化mysql连接
    dbUtils.initConnect();
    // 初始化redis连接
    redisUtils.initConnect();
}
mounted()

var userService = {
    genderId:()=> {
        return new Date().getFullYear().toString().substring(2, 4) + "0" + (new Date().getTime()).toString().substring(7, 19);
    },
    login : (username,password) =>{
        return new Promise((resolve,reject)=>{
            var sql = "SELECT * FROM SYS_USER WHERE USER_NAME = '" + username + "' AND PASS_WORD = '" + password + "'";
                dbUtils.query(sql)
                .then(res=>{
                    resolve(res)
                }).then(err=>{
                    reject(err)
                })
        })
    },
    getUserList: () => {
        return new Promise((resolve, reject) => {
            var sql = " SELECT * FROM SYS_USER ";

            var redisResult = redisUtils.get(bizConst.userConst.REDIS_KEY)
            
            redisUtils.get(bizConst.userConst.REDIS_KEY).then(redisResult => {
               console.log('redis获取到的数据', redisResult)
               if (redisResult) {
                   // 如果redis里面有
                   resolve(JSON.parse(redisResult))
               } else {
                   // 如果redis里面没有
                   dbUtils.query(sql)
                       .then(res => {
                           redisUtils.set(bizConst.userConst.REDIS_KEY, JSON.stringify(res))
                           resolve(res)
                       }).then(err => {
                           reject(err)
                       })
               }
            })
            
        })
    },
    deleteUser:(id) => {
         return new Promise((resolve, reject) => {
            var sql = " DELETE FROM SYS_USER WHERE ID = '" + id + "' ";
            dbUtils.update(sql)
                .then(res => {
                    // 删除缓存
                    redisUtils.del(bizConst.userConst.REDIS_KEY)
                    resolve(res)
                }).then(err => {
                    reject(err)
                })
        })
    }
}

module.exports = userService