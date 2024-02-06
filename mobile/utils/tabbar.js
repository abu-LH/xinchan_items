let student = [
    {
        "pagePath": "/pages/student/index",
		"selectedIconPath":"/static/images/icon_01.png",
		"iconPath": "/static/images/icon_05.png",
        "text": "课程",
    },
    {
        "pagePath": "/pages/student/myHomework",
		"selectedIconPath":"/static/images/icon_02.png",
		"iconPath": "/static/images/icon_06.png",
        "text": "作业",
      
    }, {
        "pagePath": "/pages/student/clock",
		"selectedIconPath":"/static/images/icon_3.png",
		"iconPath": "/static/images/icon_07.png",
        "text": "打卡",
         
    },
    {
        "pagePath": "/pages/me",
		"selectedIconPath":"/static/images/icon_4.png",
		"iconPath": "/static/images/icon_08.png",
        "text": "我的",
    },

]
let teacher = [
    {
		"selectedIconPath":"/static/images/icon_4.png",
		"iconPath": "/static/images/icon_08.png",
        "pagePath": "/pages/teacher/index",
        "text": "学生",
    },
    {
        "pagePath": "/pages/teacher/TeacherWork",
		"selectedIconPath":"/static/images/icon_02.png",
		"iconPath": "/static/images/icon_06.png",
        "text": "作业",
    },
    {
        "pagePath": "/pages/teacher/class",
		"selectedIconPath":"/static/images/icon_01.png",
		"iconPath": "/static/images/icon_05.png",
        "text": "课次",
    },
    {
        "pagePath": "/pages/teacher/classdetails",
		"selectedIconPath":"/static/images/icon_3.png",
		"iconPath": "/static/images/icon_07.png",
        "text": "考勤",
    },
    {
        "pagePath": "/pages/me",
		"selectedIconPath":"/static/images/icon_4.png",
		"iconPath": "/static/images/icon_08.png",
        "text": "我的",
    },
]
let admin = [
    {
        "pagePath": "/pages/admin/index",
		"selectedIconPath":"",
        "text": "首页",
		"iconPath":"/static/images/icon_09.png",
    }, 
	{
	    "pagePath": "/pages/admin/userManagement",
		"selectedIconPath":"",
	    "text": "用户",
		"iconPath":"/static/images/icon_10.png",
	},
	{
	    "pagePath": "/pages/admin/newClass",
		"selectedIconPath":"/static/images/icon_15.png",
	    "text": "班级",
		"iconPath":"/static/images/icon_11.png",
	},
	{
	    "pagePath": "/pages/admin/Added",
		"selectedIconPath":"",
	    "text": "课程",
		"iconPath":"/static/images/icon_12.png",
	},
	{
	    "pagePath": "/pages/admin/location",
	    "text": "机构",
		"iconPath":"/static/images/icon_13.png",
	},
    {
        "pagePath": "/pages/me",
		"selectedIconPath":"/static/images/icon_4.png",
        "text": "我的",
		"iconPath":"/static/images/icon_14.png",
    },
]
let platformAdmin = [
    // 平台管理员
    {
        "pagePath": "/pages/platform-admin/index",
        "text": "用户管理",
    },
   
    {
        "pagePath": "/pages/platform-admin/Administratorname",
        "text": "机构管理",
    },
   
    {
        "pagePath": "/pages/platform-admin/adminRegisterList",
        "text": "待审核",
    },
    {
        "pagePath": "/pages/me",
		"selectedIconPath":"/static/images/icon_4.png",
		"iconPath": "/static/images/icon_08.png",
        "text": "我的",
    },
]
export default {
    student,
    teacher,
    admin,
    platformAdmin
}