# cxl-node-template
🌙基于node+express+mysql 快速开发脚手架

![](https://ftp.bmp.ovh/imgs/2021/04/bcb27165bccf3b9b.png)

### 项目介绍
适应前后端分离开发的一款基于node快速接口开发脚手架(模板),集成了mysql，redis的存储，一键式配置，模块层层分离，适应小型项目的后端开发框架。

- 整合Node.js+express
- 整合MySQL5,6数据库
- 整合Redis缓存数据库
- 文件单/多上传
- 统一返回值封装
- 统一UUID生成
- websocket整合



### 部署运行

#### 1.克隆项目
```bash
git clone https://github.com/18696232390/cxl-node-template.git
```

#### 2.安装依赖
```bash
cd cxl-node-template
npm install  # 或者 npm i
```

#### 3.启动访问
```bash
npm start
```
访问127.0.0.1:10317，您将会看到如下页面，证明启动成功

![运行成功截图](https://ftp.bmp.ovh/imgs/2021/04/40282d38738199fd.png)


#### 4.相关配置
系统默认集成了MySQL和Redis(默认关闭)

##### 4.1 修改mysql配置
找到文件 \config\baseConfig.js文件

![](https://ftp.bmp.ovh/imgs/2021/04/72dc6b2a80eb2a7f.png)

修改sql对象改成您的数据库配置即可,`showSql`用来启动后运行时命令行里面是否显示执行的sql语句

```javascript
 sql:{
        host:'127.0.0.1',
        port:'3306',
        user:'root',
        password:'root',
        database:'test',
        showSql:true // 是否显示sql
    },
```


##### 4.2 启用和修改redis配置
找到文件 \config\baseConfig.js文件

![](https://ftp.bmp.ovh/imgs/2021/04/72dc6b2a80eb2a7f.png)

修改redis对象即可，默认是不使用redis，若想使用，请修改`isOpen`为`true`即可！

用户名密码尚未实现

```javascript
 redis: {
        isOpen: false,
        ip: '127.0.0.1',
        port: 6379,
        username: '',
        password: ''
    }
```


### 二次开发指南
> 开发文档完整版：https://18696232390.github.io/cxl-node-template/
#### 1.接口开发
##### 1.1 创建第一个接口
在`/src/api/` 下创建helloWorldApi.js，引入如下头部
```js
const express = require('express');
const router = express.Router();
const apiUtils = require('../../utils/apiUtils')

router.get('/test',async (req, res) => {
  try {
      apiUtils.sendSuccessMsg(res,"HelloWorld")
  } catch (error) {
      apiUtils.sendErrorMsg(res)
  }
})

module.exports = router;

```

##### 1.2 注册接口
在`/app.js`里面
```js
app.use('/test', require(__dirname + '/src/api/helloWorldApi'));
```

##### 1.33.启动访问
```
http://127.0.0.1:10317/test/test
```
可以看到页面上返回
```json
{
  "code": "1",
  "msg": "调用接口成功",
  "data": "HelloWorld",
  "request_time": 1618906315494
}
```

#### 2.操作MySQL
##### 2.1 引入MySQL工具类 
系统已经默认初始化mysql连接，无需自己初始化
```js
const dbUtils = require('../../utils/dbUtils')
```

##### 2.2 查询数据
使用`dbUtils.query(sql)`进行查询
```js
  var sql = "SELECT * FROM SYS_USER WHERE USER_NAME = '" + username + "' AND PASS_WORD = '" + password + "'";
  dbUtils.query(sql)
   .then(res=>{
       resolve(res)
   }).then(err=>{
       reject(err)
   })
```

##### 2.3 更新数据
使用`dbUtils.update(sql)`进行更新/修改/删除
```js
var sql = " DELETE FROM SYS_USER WHERE ID = '" + id + "' ";
  dbUtils.update(sql)
    .then(res => {
        resolve(res)
    }).then(err => {
        reject(err)
    })
```
#### 3.Redis操作
##### 3.1 引入redis工具类
```js
const redisUtils = require('../../utils/redisUtils')
```
注意要开启redis功能

##### 3.2 存入redis
语法：
```js
redisUtils.set(key , 数据)
```
案例：
```js
redisUtils.set(bizConst.userConst.REDIS_KEY, JSON.stringify(res))
```

##### 3.3 取数据
语法：
```js
redisUtils.get(值的key).then(res=>{
   // .. res为存入的数据
})
```

案例：

```js
redisUtils.get(bizConst.userConst.REDIS_KEY).then(redisResult => {
  // 业务代码
})
```

##### 3.4 删除数据
语法：
```js
redisUtils.del(值的key)
```
案例：
```js
redisUtils.del(bizConst.userConst.REDIS_KEY)
```


### 开发进度

| 功能名称 | 是否完成| 完成时间 |
| - |- |- |
| 🌟基本的node框架+解决跨域 | 是|2021年3月27日 |
| 🌟整合Mysql| 是 | 2021年4月17日 | 
| 🌟整合Redis| 是 | 2021年4月17日 | 
| 🌟封装返回实体| 是 | 2021年4月17日 | 
| 🌟封装mysql+redis| 是 | 2021年4月17日 | 
| 🌟封装单/多文件上传| 是 | 2021年4月17日 | 
| 🌟整合websocket | 是 | 2021年4月20日 |
| 📌封装mysql分页功能 | 否 | 待实现 |
| 📌整合封装ElasticSearch | 否 | 待实现 |
| 📌整合封装相关OSS接口 | 否 | 待实现 |


### 参考
| 技术点 | 原创链接 |
| - | -|
| redis简单使用 | https://segmentfault.com/a/1190000015882650 | 
| 单/多文件上传 | https://github.com/acexyf/multerDemo/|
