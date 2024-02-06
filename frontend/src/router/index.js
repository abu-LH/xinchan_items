import { createRouter, createWebHistory } from 'vue-router'
import index from '../pages/index.vue'
import platformAdminRoutes from './platform-admin'
import adminRoutes from './admin'
import teacherRoutes from './teacher'
import studentRoutes from './student'
import indexRouter from './no-school-index'
import register from '../pages/register.vue'
import login from '../pages/login.vue'
import noSchoolIndex from '../pages/noSchoolIndex.vue'
import hasSchoolIndex from '../pages/hasSchoolIndex.vue'


const routes = [
    {
        name: 'index',
        path: '/',
        component: index,
    },{
        name: 'register',
        path: '/register',
        component: register
    },
    {
        name: 'login',
        path: '/login',
        component: login
    },{
        name : 'no-school-user',
        path : '/no-school-user',
        redirect: '/no-school-user/applyfor',
        component : noSchoolIndex,
        children:indexRouter
    },
    {
        name: 'platform-admin',
        path: '/platform-admin',
        component: hasSchoolIndex,
        redirect: '/platform-admin/lis',
        children: platformAdminRoutes
    },
    {
        name: 'admin',
        path: '/admin',
        component: hasSchoolIndex,
        redirect: '/admin/audit',
        children: adminRoutes
    },
    {
        name: 'teacher',
        path: '/teacher',
        component: hasSchoolIndex,
        redirect : '/teacher/list',
        children: teacherRoutes
    },
    {
        name: 'student',
        path: '/student',
        component: hasSchoolIndex,
        redirect : '/student/students',
        children: studentRoutes
    },
]

let router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    console.log('页面跳转：', to.fullPath)
    next()
})

export default router

