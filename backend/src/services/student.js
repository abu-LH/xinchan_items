/**
 * 学生角色服务接口
 */

const db = require('../common/db')
           
module.exports = {
    // 学生
    //查寻班级课程
     async classtimes(params) {
        const sql =`
        select classtimes.*,users.username  from  classtimes JOIN users JOIN schools ON   classtimes.classId=? AND classtimes.teacherId=users.id AND users.schoolId=? and schools.id=users.schoolId`
        return await db.query(sql,[params.classid,params.schoolId])
    },
     //查寻班级课程详情
     async classtime(params) {
        const sql =`select  *  from  classtimes where id=? and classId=?`
        return await db.query(sql,[params.id,params.classId])
    },
     //查寻班级作业
    async homeworks(params) {
        const sql = 'select  * from homeworks  where studentId =? and classId=?'
        return await db.query(sql,[params.homeworkId,params.classid])
    },
     //查寻作业详情
    async homework(params) {
        const sql = 'select classtimes.*,homeworks.files,homeworks.remark,homeworks.review,homeworks.classtimeId from homeworks,classtimes  where  homeworks.classtimeId=classtimes.id and classtimeId=? and studentId =? and  homeworks.classId=? '
        return await db.query(sql,[params.id,params.userid,params.classId])
    },
     //查寻打卡id
    async clock(params) {
        const sql = 'select  latitude,longitude,schools.id from schools ,users where users.id=? and users.schoolId=schools.id'
        return await db.query(sql,[params.id])
    },
    //添加打卡id
    async addclock(params) {
        const sql = 'INSERT INTO punchtimes (schoolId, userId,isLeaving,createTime,state) VALUES (?,?,?,?,?)' 
        return await db.query(sql,[
            params.schoolId,
            params.userId,
            params.isLeaving,
            params.createTime,
            params.state,

        ])
    },
     //查寻学生打卡列表
    async getclock(params) {
        const sql = 'select punchtimes.*,schools.`name` from punchtimes,classes_users,schools where punchtimes.userId=classes_users.userId and  classId=? AND punchtimes.userId=? AND schools.id=?' 
        return await db.query(sql,[params.classid,params.userid,params.schoolId])
    },
    //提交作业
    async joinHomeworks(params) {
        // console.log(params);
        let studentId=params.studentId
        let files=params.files
        let remark=params.remark
        let classtimeId=params.classtimeId
         
        const sql = 'update homeworks set files=?,remark=? where  studentId=? and classtimeId=?'
        return await db.query(sql,
            [ 
            files, 
            remark ,
            studentId,
            classtimeId
        ]
        )
    },

}