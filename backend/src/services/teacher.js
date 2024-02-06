/**
 * 教师角色服务接口
 */

const db = require('../common/db')

module.exports = {
    // 获取已结束的最近一个课次
    async courseData(classId) {
        const sql = 'select * from classtimes where classId = ? and endTime < NOW() order by endTime desc'
        return await db.query(sql, [classId])
    },
    // 获取当天作业
    async todayHomeWork(classtimeId) { //SELECT homeworks.*, users.`name` as 'studentName', classtimes.`name` as classTimeName  from homeworks left join users on homeworks.studentId = users.id left join classtimes on homeworks.classtimeId = classtimes.id where classtimeId = ? 
        const sql = "SELECT homeworks.*, users.`name` as 'studentName', classtimes.`name` as classTimeName  from homeworks left join users on homeworks.studentId = users.id left join classtimes on homeworks.classtimeId = classtimes.id "
        return await db.query(sql, classtimeId)
    },
    // 获取补交作业
    async makeUpHomeWork(classId, classtimeId) { //SELECT homeworks.*, users.`name` as studentName, classtimes.`name` as classTimeName  from homeworks left join users on homeworks.studentId = users.id left join classtimes on homeworks.classtimeId = classtimes.id where homeworks.classId = ? and classtimes.Id != ? and review is null and files != ''
        const sql = "SELECT homeworks.*, users.`name` as studentName, classtimes.`name` as classTimeName  from homeworks left join users on homeworks.studentId = users.id left join classtimes on homeworks.classtimeId = classtimes.id where  classtimes.Id != 5 and review is null and files != ''"
        return await db.query(sql, [classId, classtimeId])
    },


    // 获取学生作业课次详情
    async getClassesMessage(id) {
        const sql = 'SELECT * FROM classtimes ,homeworks WHERE  homeworks.id=? AND homeworks.classtimeId=classtimes.id'
        return await db.query(sql,id)
    },
    // 查看学生作业列表
    async studentHomrWorkList(id) {
        const sql = 'SELECT homeworks.files, homeworks.updateTime, homeworks.remark, users.`name` FROM homeworks left join users on homeworks.studentId = users.id WHERE homeworks.studentId = ?'
        return await db.query(sql, id)
    },
    // 提交评语
    async submitReview(val) {
        const sql = 'UPDATE homeworks set review = ? WHERE studentId = ?'
        return await db.query(sql, val)
    },
    //查找学生
    async student(index) {
        const sql = "SELECT * FROM users, classes_users where users.id = classes_users.userId and classes_users.classId = ? and users.role = ?"
        return await db.query(sql, [index, "学生"])
    },
    //查找课次
    async Class(index, index1) {
        const sql = "SELECT * FROM classtimes where classId=? and teacherId=? "
        return await db.query(sql, [index, index1])
    },
    //查找课程
    async content(index) {
        const sql = "SELECT * FROM classes,courses,contents WHERE classes.id=1 AND classes.id=courses.id AND courses.id=contents.id "
        return await db.query(sql, index)
    },
    //删除课次
    async deletclass(name) {
        const sql = "DELETE FROM classtimes WHERE name=?;"
        return await db.query(sql,name)
    },
    //添加课次
    async addclass(body) {
        const sql = "insert into classtimes (schoolId ,courseId ,contentId ,classId ,teacherId ,name ,startTime ,endTime ,createTime ,updateTime) values (?,?,?,?,?,?,?,?,?,?);"
        return await db.query(sql,body)
    },
    //查看shoolid
    async selctshool(id) {
        console.log(id)
        const sql = "SELECT * FROM classes ,contents WHERE classes.id=? and contents.id=classes.id"
        return await db.query(sql,id)
    },
    //更改课次
    async classupdat(name,id,createTime,createupdate){
        const sql="update classtimes set name=?,startTime=?,endTime=? where id=?"
        return await db.query(sql,[name,createTime,createupdate,id])
    },
    //查找重复
    async theSame(startTime,endTime){
        const sql="SELECT * FROM classtimes where startTime=? or endTime=?"
        return await db.query(sql,[startTime,endTime])
    },
    async ClassDEtails(index) {
        const sql = "SELECT * FROM classes_users,users,punchtimes WHERE punchtimes.userId=classes_users.userId AND users.role=? AND classes_users.userId=users.id AND classes_users.classId=? "
        return await db.query(sql, ["学生", index])
    },
    //查看点击课次
    async clickClass(arr) {
        const sql =  "SELECT * FROM classtimes where  name=?"
        return await db.query(sql, arr)
    },
    //更新课次
    async Courseware(Courseware,name) {
        const sql =  "update classtimes set coursewareFiles=? where name=?"
        return await db.query(sql,[Courseware, name])
    },
    //更新作业
    async Homework(Courseware,name) {
        const sql =  "update classtimes set homeworkFiles=? where name=?"
        return await db.query(sql, [Courseware, name])
    },
    async studentDEtails(name,id) {
        const sql = "SELECT * FROM users,classes_users,punchtimes WHERE users.id=classes_users.userid and classes_users.userid=punchtimes.userid and users.name=? and classes_users.classid=?"
        return await db.query(sql, [name,id])
    },
}

