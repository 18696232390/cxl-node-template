const elasticsearch = require('elasticsearch');
const baseConfig = require('../config/baseConfig');
const dbUtils = require('./dbUtils');
var esUtils = {}

esUtils.connection = null


dbUtils.initConnect = () =>{
  if(!esUtils.connection){
    var connection = new elasticsearch.Client({
      host: baseConfig.elasticsearch.ip+":"+baseConfig.elasticsearch.port,
      log: baseConfig.elasticsearch.loggerLevel
    });
    dbUtils.connection = connection
  }
}










module.exports = esUtils