/**
 * 平台管理员角色服务接口
 */
const db = require('../common/db')

module.exports = {
    //查询机构
    async orgsearch(name) {
        console.log(name)
        const sql = "select name,legalPerson,id from schools where status='正常' and name like ?"
        let result = await db.query(sql, '%' + name + '%')
        if (result.length == 0) {
            return {
                error: '您搜索的机构不存在'
            }
        } else {
            return result
        }
    },
    // 申请加入机构
    async orgApply(req) {
        console.log(req)
        const applicantId = req.form.applicantId
        const name = req.form.name
        const legalPerson = req.form.legalPerson
        const legalPersonIdentityNo = req.form.legalPersonIdentityNo
        const businessLicense = req.form.businessLicense
        const applicantName = req.form.applicantName
        const applicantIdentityNo = req.form.applicantIdentityNo
        const businessLicensePhoto = req.form.businessLicensePhoto
        const applicantIdentityCardFrontsidePhoto = req.form.applicantIdentityCardFrontsidePhoto
        const applicantIdentityCardBacksidePhoto = req.form.applicantIdentityCardBacksidePhoto
        const status = '审核中'
        console.log([applicantIdentityCardBacksidePhoto, applicantIdentityCardFrontsidePhoto, businessLicensePhoto, name, legalPerson, legalPersonIdentityNo, businessLicense, applicantName, applicantIdentityNo, status])

        const sql = 'insert into schools (applicantId,applicantIdentityCardBacksidePhoto,applicantIdentityCardFrontsidePhoto,businessLicensePhoto,name,legalPerson,legalPersonIdentityNo,businessLicense,applicantName,applicantIdentityNo,status) value(?,?,?,?,?,?,?,?,?,?,?)'
        let result = await db.query(sql, [applicantId, applicantIdentityCardBacksidePhoto, applicantIdentityCardFrontsidePhoto, businessLicensePhoto, name, legalPerson, legalPersonIdentityNo, businessLicense, applicantName, applicantIdentityNo, status])
        if (result.error) {
            return {
                error: result.error
            }
        }
        return result
    },
    // 查询待加入机构
    async registerOrg() {
        const status = '审核中'
        const sql = "select name,legalPerson,legalPersonIdentityNo,businessLicense,businessLicensePhoto,applicantId,applicantName,applicantIdentityNo,applicantIdentityCardFrontsidePhoto,applicantIdentityCardBacksidePhoto,Id,createTime from schools where status=?"
        const result = await db.query(sql, status)
        return result
    },
    // 已加入机构信息
    async orgList() {
        const sql = "select id,name,status,legalPerson,legalPersonIdentityNo,businessLicense,businessLicensePhoto,applicantId,applicantName,applicantIdentityNo,applicantIdentityCardFrontsidePhoto,applicantIdentityCardBacksidePhoto,createTime from schools "
        const result = await db.query(sql)
        return result
    },
    // 待加入机构具体单个信息
    // 待加入机构信息
    async detailOrg(Id) {
        const status = '审核中'
        const sql = "select name,legalPerson,legalPersonIdentityNo,businessLicense,businessLicensePhoto,applicantId,applicantName,applicantIdentityNo,applicantIdentityCardFrontsidePhoto,applicantIdentityCardBacksidePhoto,createTime from schools where Id=? and status=? limit 1"
        const result = await db.query(sql, [Id, status])
        return result[0]
    },
    //同意机构加入
    async agreeOrg(params) {
        const Id = params.schoolId
        const useId = params.id
        const status = '正常'
        const sql = "update schools set status=? where id=? and status='审核中'"
        const result = await db.query(sql, [status, Id])
        await db.query("update users set schoolId=?,status='正常' where id = ?", [Id, useId])
        return result
    },
    //拒绝机构加入，或删除机构
    async rejectOrg(Id) {
        const status = '拒绝'
        const sql = 'update schools set status=? where Id=?'
        const result = await db.query(sql, [status, Id])
        return result
    },
    // 查询管理员全部信息
    async orgAdmin() {
        const sql = "select users.id,users.`name`,users.role,users.roleType,users.`status`,users.username,users.updateTime,users.createTime,users.email,users.gender,schools.`name` as schoolName,users.phone,users.schoolId FROM users JOIN schools ON users.schoolId=schools.id and users.roleType!='platform-admin'"
        let result = await db.query(sql)
        console.log(result)
        return result
    },


    // 删除用户
    async removeUser(id) {
        const sql = "update users set status = '屏蔽' where id=?"
        let result = await db.query(sql, id)
        if (result.affectedRows === 1) {
            return {
                error: '删除用户成功'
            }
        } else if (result.error) {
            return {
                error: result.error
            }
        }
        return result
    },
    // 查询用户
    async orgAdminDetail(id) {
        const sql = "select users.id,users.`name`,users.role,users.roleType,users.`status`,users.username,users.updateTime,users.createTime,users.email,users.gender,schools.`name` as schoolName,users.phone,users.schoolId FROM users JOIN schools ON users.schoolId=schools.id and users.id=?"
        let result = await db.query(sql,id)
        console.log(result)
        return result
    },
    // 删除机构
    async removeSchool(id) {
        const sql = "update schools set status = '屏蔽' where id = ?"
        let result = await db.query(sql, id)
        if (result.affectedRows === 1) {
            return {
                error: '删除机构成功'
            }
        } else if (result.error) {
            return {
                error: result.error
            }
        }
        return result
    }
    // 更改机构

    // 更改用户
}

