
import TeacherWord from '../pages/teacher/TeacherWord.vue'
import TeacherWordDetails from '../pages/teacher/TeacherWordDetails.vue'
import Class from '../pages/teacher/class.vue'
import ClassDetails from '../pages/teacher/classDetails.vue'
import DetailsCourse from '../pages/teacher/detailsCourse.vue'
import list from '../pages/teacher/list.vue'
import Contents from '../pages/teacher/contents.vue'





// 教师相关页面的二级路由
export default [
    {
        title : '我的学生',
        name : 'list',
        path : 'list',
        component : list
    },
    {
        title : '课次管理',
        name : 'class',
        path : 'class',
        component : Class
    },
    {
        title : '作业管理',
        name : 'homework',
        path : 'homework',
        component : TeacherWord
    },
    {
        title : '考勤管理',
        name: 'ClassDetails',
        path: 'ClassDetails',
        component: ClassDetails,
    },
    {
        name: 'DetailsCourse',
        path: 'DetailsCourse',
        component: DetailsCourse,
    },
    {
        name: 'teacherworddetails',
        path: 'teacherworddetails',
        component: TeacherWordDetails,
    },
    // {
    //     title:'课次管理',
    //     name: 'Contentloop',
    //     path: 'Contentloop',
    //     component: Contentloop,
    // },
    {
        name: 'Contents',
        path: 'Contents',
        component: Contents,
    },
//  {
    //     name : 'homework',
    //     path : 'homework',
    //     component : TeacherWord
    // },
]

