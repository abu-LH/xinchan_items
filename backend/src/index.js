/**
 * 后端程序入口
 */

const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const app = express()

app.use(cors())
app.use(express.json())
// const router = express.Router();
// router.use(express.urlencoded({extended:false}))
// router.post

const port = 8000

// 用于测试服务是否正常运行
app.get('/', function(req, res) {
    res.send('服务正常运行')
})

// 初始化路由表
routes.init(app)

// 启动后端服务
app.listen(port, function() {
    console.log('HTTP服务成功启动，端口号:', port)
})

