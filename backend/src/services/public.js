/**
 * 公共服务接口
 */

const db = require('../common/db')
const md5 = require('md5')
const formidable = require('formidable')
const fs = require('fs-extra')

const FILES_DIR = '/opt/xinchanedu/files/'
// const FILES_DIR = 'C:/files/'

module.exports = {
    // 文件上传
    fileUpload(req) {
        return new Promise(function (resolve, reject) {
            const form = formidable({ hashAlgorithm: 'md5' })

            form.parse(req, (error, fields, files) => {
                if (error) {
                    resolve({ error })
                    return
                }
                let file = files.file
                let filePath = file.filepath
                // console.log('filePath', filePath)
                let destPath = FILES_DIR + file.hash + '/' + file.originalFilename
                console.log('文件上传', destPath)
                fs.move(filePath, destPath, { overwrite: true }, err => {
                    if (err) {
                        // console.log(err.message)
                        // if (err.message === 'dest already exists.')
                        // {
                        //     console.log('文件已存在', destPath)
                        //     return resolve({error: '文件已存在，请勿重复上传'})
                        // }
                        return resolve({ error: '上传文件失败' })
                    }
                    resolve(file.hash + '/' + file.originalFilename)
                })
            })
        })
    },

    // 用户注册
    async register(params) {
        let username = params.username
        let password = params.password
        let name = params.name
        let gender = params.gender
        let phone = params.phone ? params.phone : ' '
        let email = params.email ? params.email : ' '
        let roleType = params.roleType
        let role = params.role

        console.log(username, password, name, gender, phone, email, roleType, role)

        // 对信息进行合法性校验

        // MD5加密
        password = md5(password)

        const sql = "insert into users (status,username, password, name, gender, phone, email,roleType,role) values ('无机构',?, ?, ?, ?, ?, ?, ?, ?)"
        let result = await db.query(sql, [username, password, name, gender, phone, email, roleType, role])
        if (result.error) {
            return { error: '用户名已被使用，请改用其他用户名' }
        }
        return await this.login(params)
    },

    // 用户登录
    async login(params) {
        let username = params.username
        let password = params.password
        // MD5加密
        password = md5(password)
        const sql = 'select id, schoolId, status, username, name, gender, phone, email, role, roleType from users where username = ? and password = ? limit 1'
        let result = await db.query(sql, [username, password])
        if (result.length !== 1) {
            return { error: '用户名或密码错误' }
        } else if (result.error) {
            return { error: result.error }
        } else if (result[0].status == '屏蔽') {
            return { error: '您被限制登录，请联系管理人员' }
        }
        console.log(new Date(), result[0].username + '登录')
        return result[0]
    },
    // 未加入机构详情
    async detailAdmin(Id) {
        const status = '审核中'
        const sql = "select name,legalPerson,legalPersonIdentityNo,businessLicense,businessLicensePhoto,applicantId,applicantName,applicantIdentityNo,applicantIdentityCardFrontsidePhoto,applicantIdentityCardBacksidePhoto,createTime from schools where applicantId=? and status=? limit 1"
        const result = await db.query(sql, [Id, status])
        return result[0]
    },
    // 获取特定某人班级信息
    async detailClass(id) {
        const sql = "select classes.name as 'className',classes.id as 'classId' from classes left join classes_users on classes.id=classes_users.classId where classes_users.userId=?"
        const result = await db.query(sql, id)
        return result
    },

    // 申请加入机构
    async agreeApply(params) {
        const userId = params.id
        const schoolId = params.schoolId
        const name = params.name
        const identityNo = params.applicantIdentityNo
        const identityCardFrontsidePhoto = params.applicantIdentityCardBacksidePhoto
        const identityCardBacksidePhoto = params.applicantIdentityCardFrontsidePhoto
        console.log(userId, schoolId, name, identityNo, identityCardFrontsidePhoto, identityCardBacksidePhoto)
        const canResolve = await db.query("select status from users where id=?", userId)
        if (canResolve[0].status == '审核中') {
            return {
                error: '请勿重复提交申请'
            }
        }
        const sql = "update users set schoolId=?,name=?,identityNo=?,identityCardFrontsidePhoto=?,identityCardBacksidePhoto=?,status='审核中'  where status='无机构' and id=?"
        const result = await db.query(sql, [schoolId, name, identityNo, identityCardFrontsidePhoto, identityCardBacksidePhoto, userId])
        return result
    },
    // 给未注册用户看的机构总数
    async schoolList() {
        const sql = "select name,legalPerson,id from schools where status='正常' limit 8"
        let result = await db.query(sql)
        return result
    },
    // 未登录机构列表详情信息
    async searchDetail(id) {
        console.log(id)
        const sql = "select name,legalPerson,legalPersonIdentityNo,id,businessLicense,applicantName from schools where id=? "
        const result = await db.query(sql, id)
        console.log(result)
        return result
    },
    // 查询根据用户查询学校的状态
    async schoolStatus(id) {
        const sql = "select status from schools where applicantId =? limit 1"
        const result = await db.query(sql, id)
        if (result.length === 1)
            return result[0]
        else
            return {
                status: '无机构'
            }
    },
    //查询已申请用户的详细信息
    async userDetail(id) {
        const sql = "select id,name,identityNo,identityCardFrontsidePhoto,identityCardBacksidePhoto from users where id=? limit 1"
        let result = await db.query(sql, id)
        return result[0]
    }
}

