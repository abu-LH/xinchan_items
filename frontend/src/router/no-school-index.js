import apply from '../pages/no-school-user/adminApply.vue'
import Theadministrator from '../pages/no-school-user/Theadministrator.vue'
import applyfor from '../pages/no-school-user/applyfor.vue'
export default[
   {
        name : 'school-apply',
        path : '/school-apply',
        component : apply
    },{
        title:'申请加入机构',
        name : 'Theadministrator',
        path : 'Theadministrator',
        component : Theadministrator
    }, {
        title:'搜索机构名单',
        name : 'applyfor',
        path : 'applyfor',
        component : applyfor
    },
]