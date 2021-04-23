var mysql = require('mysql')
const baseConfig = require('../config/baseConfig')
var dbUtils = {}
dbUtils.connection = null

dbUtils.initConnect = () => {
  if (!dbUtils.connection) {
    var connection = mysql.createConnection({
      //创建mysql实例
      host: baseConfig.sql.host,
      port: +baseConfig.sql.port,
      user: baseConfig.sql.user,
      password: baseConfig.sql.password,
      database: baseConfig.sql.database,
    })
    dbUtils.connection = connection
    connection.connect()
    console.log(
      '\033[42;30m 模块-MYSQL \033[40;32m Starting successfully \033[m'
    )
  }
}

dbUtils.query = (sql) => {
  if (!dbUtils.connection) {
    console.error('数据库尚未连接!')
    return
  }
  return new Promise((resolve, reject) => {
    if (baseConfig.showSql) {
      console.log('[SQL]=> [' + sql + ']')
    }
    dbUtils.connection.query(sql, function (err, result) {
      if (err) {
        console.log('[SELECT ERROR]:', err.message)
        reject(err)
      }
      console.log(result) //数据库查询结果返回到result中
      resolve(result)
    })
  })
}

dbUtils.update = (sql) => {
  if (!dbUtils.connection) {
    console.error('数据库尚未连接!')
    return
  }
  return new Promise((resolve, reject) => {
    if (baseConfig.showSql) {
      console.log('[SQL]=> [' + sql + ']')
    }
    dbUtils.connection.query(sql, function (err, result) {
      if (err) {
        console.log('[UPDATE ERROR]:', err.message)
        reject(err)
      }
      console.log(result) //数据库查询结果返回到result中
      resolve(result)
    })
  })
}

var mysql = dbUtils

module.exports = mysql
