// 管理员相关页面的二级路由
import audit from '../pages/admin/audit.vue'
import added from '../pages/admin/Added.vue'
import newClass from '../pages/admin/newClass.vue'
import user from '../pages/admin/user management.vue'
import location from '../pages/admin/location.vue'

export default[
        {   title:'人员审核',
            name: 'audit',
            path: 'audit',
            component: audit
        },
        {   title:'课程管理',
            name: 'added',
            path: 'added',
            component: added
        },
        {   title:'班级管理',
            name: 'newClass',
            path: 'newClass',
            component: newClass
        },
        {   title:'用户管理',
            name: 'user',
            path: 'user',
            component: user
        },
        {   title:'机构设置',
            name: 'location',
            path: 'location',
            component: location
        },
]

