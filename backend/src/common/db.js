/**
 * 数据库通用模块
 */

const mysql = require('mysql')

const config = {
    host: '47.92.34.231',
    port: 3306,
    user: 'root',
    password: 'DB@huizhouxinchan@301',
    database: 'xinchanedu',
    connectionLimit: 20,
}


// const pool = mysql.createPool(config)

let connection = null
function connect() {
    connection = mysql.createConnection(config)
    connection.connect(function (error, ...args) {
        if (error) {
            console.log('数据库连接错误', error)
        } else {
            // console.log(args)
            console.log('数据库连接成功')
        }
    })
}
connect()

function query(sql, params = [], retry = false) {
    if (!connection) return

    return new Promise(function(resolve, reject) {
        connection.query(sql, params, function(error, data) {
            if (error) {
                if (!retry) {
                    // 重新连接再试一次
                    console.log('错误', error.message, '，重新连接再试一次')
                    connection.destroy()
                    connect()
                    query(sql, params, true)
                } else {
                    console.log('查询错误', error)
                    resolve({error}) // 不用reject是为了避免抛异常
                }
            } else {
                resolve(data)
            }
        })
    })
}

function getConnection() {
    return connection
}

module.exports = {
    query,
    getConnection
}

