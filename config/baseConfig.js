var baseConfig = {
    // 启动端口 
    port: 10317,
    sql:{
        host:'127.0.0.1',
        port:'3306',
        user:'root',
        password:'root',
        database:'test',
        showSql:true // 是否显示sql
    },
    redis: {
        isOpen: false,
        ip: '127.0.0.1',
        port: 6379,
        username: '',
        password: ''
    },
    elasticsearch:{
        isOpen:false,
        ip:'127.0.0.1',
        port:9200,
        username:'',
        password:'',
        loggerLevel:'error',
    }
}

module.exports = baseConfig