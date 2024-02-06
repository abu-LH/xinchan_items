// 平台管理员相关页面的二级路由
import lis from '../pages/platform-admin/Administrator.vue'
import use from '../pages/platform-admin/Administratorname.vue'
import adminRegister from '../pages/platform-admin/adminRegister.vue'
import adminRegisterList from '../pages/platform-admin/adminRegisterList.vue'



export default [
    {
        title : "用户管理",
        name : 'lis',
        path : 'lis',
        component : lis
    }
    ,{
        title : "机构管理",
        name : 'use',
        path : 'use',
        component : use
    }
    ,{
        title : "机构审核",
        name : 'adminRegisterList',
        path : 'adminRegisterList',
        component : adminRegisterList
    }
    ,{
        name : 'adminRegister',
        path : 'adminRegister',
        component : adminRegister
    },
   
    
    

]

