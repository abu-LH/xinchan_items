/**
 * 后端接口路由表
 */

const public = require('./services/public')
const platformAdmin = require('./services/platform-admin')
const admin = require('./services/admin')
const teacher = require('./services/teacher')
const student = require('./services/student')

function init(app) {

    // 公共服务路由

    // 文件上传
    app.post('/file-upload', async function (req, res) {
        res.send(await public.fileUpload(req))
    })

    // 用户注册
    app.post('/register', async function (req, res) {
        res.send(await public.register(req.body))
    })

    // 用户登录
    app.post('/login', async function (req, res) {
        res.send(await public.login(req.body))
    })
    //搜索机构名单
    app.get('/search', async function (req, res) {
        res.send(await platformAdmin.orgsearch(req.query.value))
    })
    // 申请加入机构
    app.post('/school-apply', async function (req, res) {
        res.send(await platformAdmin.orgApply(req.body))
    })
    // 未加入机构信息详细
    app.get('/admin/detail', async function (req, res) {
        res.send(await public.detailAdmin(req.query.Id))
    })
    // 主页班级查询
    app.get('/public/class-id', async function (req, res) {
        res.send(await public.detailClass(req.query.id))
    })
    // 未登录页面机构页面点击获取详情
    app.get('/public/search-detail', async function (req, res) {
        res.send(await public.searchDetail(req.query.id))
    })
    // 同意用户加入机构
    app.post('/public/join-school', async function (req, res) {
        res.send(await public.agreeApply(req.body))
    })
    // 搜索所有的机构给未加入机构的用户看
    app.get('/public/school-list', async function (req, res) {
        res.send(await public.schoolList())
    })
    // 查询学校的状态
    app.get('/public/school-status',async function (req,res){
        res.send(await public.schoolStatus(req.query.id))
    })
    // 查询申请人员的详细信息
    app.get('/public/user-detail',async function(req,res){
        res.send(await public.userDetail(req.query.id))
    })



    // 平台管理员角色服务路由
    // 查询单个用户详情
    app.get('/platform-admin/userOrgDetail',async function(req,res){
        res.send(await platformAdmin.orgAdminDetail(req.query.id))
    })
    // 搜索待审核机构
    app.get('/register-admin/organization', async function (req, res) {
        res.send(await platformAdmin.registerOrg())
    })
    //申请机构的详情介绍
    app.get('/platform-admin/detail', async function (req, res) {
        res.send(await platformAdmin.detailOrg(req.query.Id))
    })
    //机构的审核通过
    app.post('/platform-admin/agree', async function (req, res) {
        res.send(await platformAdmin.agreeOrg(req.body))
    })
    app.post('/platform-admin/reject', async function (req, res) {
        res.send(await platformAdmin.rejectOrg(req.body.Id))
    })
    // 已加入机构详细名单
    app.get('/platform-admin/list', async function (req, res) {
        res.send(await platformAdmin.orgList())
    })
    // 已加入的机构管理人员名单
    app.get('/platform-admin/admin', async function (req, res) {
        res.send(await platformAdmin.orgAdmin())
    })
    // 屏蔽机构
    app.post('/platform-admin/remove-user',async function(req,res){
        res.send(await platformAdmin.removeUser(req.body.id))
    })
    // 屏蔽用户
    app.post('/platform-admin/remove-school',async function(req,res){
        res.send(await platformAdmin.removeSchool(req.body.id))
    })
    // 



    // 管理员角色服务路由
    // 获取申请人信息
    app.get('/admin/usersAudit', async function (req, res) {
        res.send(await admin.usersAudit())
    })

    // 获取已经加入的人员信息
    app.get('/admin/normalUsers', async function (req, res) {
        res.send(await admin.normalUsers(req.query.schoolId))
    })

    // 更新人员信息
    app.post('/admin/updateUser',async function(req, res) {
        res.send(await admin.updateUser(req.body.newData))
    })

    // 移除已加入的用户
    app.post('/admin/deleteUsers',async function(req, res) {
        res.send(await admin.deleteUsers(req.body.oldData))
    })

    // 同意申请人加入
    app.post('/admin/agreeApply', async function (req, res) {
        res.send(await admin.agreeApply(req.body.Id))
    })

    // 拒绝申请人加入
    app.post('/admin/refuseApply', async function (req, res) {
        res.send(await admin.refuseApply(req.body.Id))
    })

    // 获取课程信息
    app.get('/admin/getCourses', async function (req, res) {
        res.send(await admin.getCourses(req.query.schoolId))
    })

    // 获取班级信息
    app.get('/admin/getClasses', async function (req, res) {
        res.send(await admin.getClasses(req.query.schoolId))
    })

    // 获取班级内用户
    app.get('/admin/getClassesUsers', async function (req, res) {
        res.send(await admin.getClassesUsers(req.query.schoolId))
    })

    // 添加课程信息
    app.post('/admin/addCourse',async function(req, res) {
        res.send(await admin.addCourse(req.body.newData))
    })

    // 更新课程信息
    app.post('/admin/updateCourse', async function (req, res) {
        res.send(await admin.updateCourse(req.body.newData))
    })

    // 返回新课程信息
    app.get('/admin/getNewCourses',async function(req, res) {
        res.send(await admin.getNewCourses(req.query))
    })

    // 删除课程信息
    app.post('/admin/deleteCourse', async function (req, res) {
        res.send(await admin.deleteCourse(req.body.newData))
    })
    
    // 更新班级课程信息（移除）
    app.post('/admin/deleteClassCourse', async function (req, res) {
        res.send(await admin.deleteClassCourse(req.body.newData))
    })

    // 更新班级课程信息（添加）
    app.post('/admin/updateClassCourse', async function (req, res) {
        res.send(await admin.updateClassCourse(req.body.newData))
    })

    // 新增班级
    app.post('/admin/addClass',async function(req, res) {
        res.send(await admin.addClass(req.body.newData))
    })

    // 返回新班级信息
    app.get('/admin/getNewClass',async function(req, res) {
        res.send(await admin.getNewClass(req.query))
    })

    // 删除班级
    app.post('/admin/deleteClass',async function(req, res) {
        res.send(await admin.deleteClass(req.body.newData))
    })

    // 添加班级用户关系信息
    app.post('/admin/addClassesUsers',async function(req, res) {
        res.send(await admin.addClassesUsers(req.body.newData))
    })

    // 更新班级信息
    app.post('/admin/updateClasses',async function(req, res) {
        res.send(await admin.updateClasses(req.body.newData))
    })

    // 更新班级用户关系信息
    app.post('/admin/updateClassesUsers',async function(req, res) {
        res.send(await admin.updateClassesUsers(req.body.newData))
    })

    // 查询机构位置
    app.get('/admin/getLocation',async function(req, res) {
        res.send(await admin.getLocation(req.query.schoolId))
    })

    // 修改机构位置
    app.post('/admin/updateLocation',async function(req, res) {
        res.send(await admin.updateLocation(req.body.newData))
    })  


    // 教师角色服务接口

    //获取课次选项
    app.get('/teacher/coursedata', async function (req, res) {
        res.send(await teacher.courseData(req.query.id))
    })
    //获取当天作业接口
    app.get('/teacher/todayhomework', async function (req, res) {
        res.send(await teacher.todayHomeWork(req.query.id))
    })
    //获取补交作业
    app.get('/teacher/makeuphomework', async function (req, res) {
        res.send(await teacher.makeUpHomeWork(req.query.classId,req.query.classTimeId))
    })

    // 获取学生作业课次详情
    app.get("/teacher/classtimes", async function (req, res) {
        res.send(await teacher.getClassesMessage(req.query.id))
    })
    //获取学生作业列表
    app.get('/teacher/studenthomeworklist', async function (req, res) {
        res.send(await teacher.studentHomrWorkList(req.query.id))
    })
    // 提交评语
    app.post('/teacher/submitreview', async function (req, res) {
        res.send(await teacher.submitReview(req.body.val))
    })
    //查找本班学生
    app.post("/teacher/student",async function(req,res){
        res.send(await teacher.student(req.body.id))
    })
    //更改课次
    app.post("/teacher/classupdat", async function (req, res) {
        console.log(req.body)
        res.send(await teacher.classupdat(req.body.name, req.body.id, req.body.createTime, req.body.updateTime))
    })
    //时间冲突
    app.post("/teacher/theSame", async function (req, res) {
        console.log(req.body)
        res.send(await teacher.theSame(req.body.startTime, req.body.endTime))
    })
    //查看考勤
    app.post("/teacher/ClassDEtails", async function (req, res) {
        res.send(await teacher.ClassDEtails(req.body.id))
    })
    //添加课次
    app.post("/teacher/addclass", async function (req, res) {
        console.log(req.body)
        res.send(await teacher.addclass(req.body.arr))
    })
    //查看课次
    app.post("/teacher/Class", async function (req, res) {
        res.send(await teacher.Class(req.body.id, req.body.id1))
    })
    //查看课程
    app.post("/teacher/content", async function (req, res) {
        res.send(await teacher.content(req.body.id))
    })
    //删除课次
    app.post("/teacher/deletclass", async function (req, res) {
        res.send(await teacher.deletclass(req.body.name))
    })
    //查看shoolid
    app.post("/teacher/selctshool", async function (req, res) {
        res.send(await teacher.selctshool(req.body.id))
    })
    //查看点击课次
    app.post("/teacher/clickClass", async function (req, res) {
        res.send(await teacher.clickClass(req.body.name))
    })
    //更新课件
    app.post("/teacher/Courseware", async function (req, res) {
        console.log(req.body)
        res.send(await teacher.Courseware(req.body.Courseware, req.body.name))
    })
    //更新作业
    app.post("/teacher/Homework", async function (req, res) {
        console.log(req.body)
        res.send(await teacher.Homework(req.body.Courseware, req.body.name))
    })
    //学生打卡查找
    app.post("/teacher/studentDEtails", async function (req, res) {
        console.log(req.body.name)
        res.send(await teacher.studentDEtails(req.body.name,req.body.id))
    })

    //获取课次
    app.get('/student/classtimes', async function (req, res) {
        res.send(await student.classtimes(req.query))
    })
    //获取课程详情
    app.get('/student/classtime', async function (req, res) {
        res.send(await student.classtime(req.query))
    })
    //获取作业
    app.get('/student/homeworks', async function (req, res) {
        res.send(await student.homeworks(req.query))
    })
    //获取作业详情
    app.get('/student/homework', async function (req, res) {
        res.send(await student.homework(req.query))
    })
    //获取打卡id
    app.get('/student/clock', async function (req, res) {
        res.send(await student.clock(req.query))
    })
    //添加打卡id
    app.post('/student/addclock', async function (req, res) {
        res.send(await student.addclock(req.body))
    })
    //获取打卡详情
    app.get('/student/getclock', async function (req, res) {
        res.send(await student.getclock(req.query))
    })
    //提交作业
    app.post('/student/joinHomeworks', async function (req, res) {
        res.send(await student.joinHomeworks(req.body))

    })
}

module.exports = {
    init
}

