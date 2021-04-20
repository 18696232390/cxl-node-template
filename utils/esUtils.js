const elasticsearch = require('elasticsearch');
const baseConfig = require('../config/baseConfig');
var esUtils = {}

esUtils.connection = null


esUtils.initConnect = () =>{
  if(!esUtils.connection){
    if(baseConfig.elasticsearch.isOpen){
      try {
        var connection = new elasticsearch.Client({
          host: baseConfig.elasticsearch.ip+":"+baseConfig.elasticsearch.port,
          log: baseConfig.elasticsearch.loggerLevel
        });
        esUtils.connection = connection
        console.log('\033[42;30m 模块-ElasticSearch \033[40;32m Starting successfully \033[m')
      } catch (e) {
        
      }
    }else{
      console.log('\033[42;40m 模块-ElasticSearch \033[40;33m 尚未开启ElasticSearch功能 \033[m')
    }
  }
}





module.exports = esUtils