<template>

    <el-table :data="tableData.arr" style="width: 100%"> 
        <el-table-column fixed prop="id"             label="id" width="60" />
        <el-table-column prop="status"            label="状态" width="80" />
        <el-table-column prop="name"                 label="学校名称" width="200" />
        <el-table-column prop="legalPerson"          label="法定代表" width="100" />
        <el-table-column prop="legalPersonIdentityNo" label="法定代表身份证" width="150" />
        <el-table-column prop="businessLicense"      label="营业执照" width="150" />
        <el-table-column prop="applicantName"        label="申请人" width="100" />
        <el-table-column prop="applicantIdentityNo"  label="申请人身份证" width="150" />
        <el-table-column prop="createTime"           label="创建时间" width="120" />
        <el-table-column prop="updateTime"           label="更新时间" width="120" />
        <el-table-column>
            <template #default='data'>
                <el-button link type="primary" size="small" @click="del(data.$index)">删除</el-button>
            </template>
        </el-table-column> 
    </el-table>
</template>
  
<script  setup>
import {reactive,onMounted} from 'vue'
import useGlobal from '../../utils/useGlobal'

const global = useGlobal()


const tableData =reactive( {
    arr:[{
        id:'',
        status:'',
        legalPerson:'',
        name:'',
        legalPersonIdentityNo:'',
        businessLicense:'',
        applicantName:'',
        applicantIdentityNo:'',
        createTime:'',
        updateTime:'',

    }] 
})

onMounted(()=>{
    request()
})
 
 async function request(){
    let e = await global.axios.get('/platform-admin/list')
   
    tableData.arr=e
   
}

    
//删除
async function del(){
let ms = await global.axios.post('/platform-admin/remove-school',{

    id:tableData.arr[e].id
  
    })

}
</script>
<style scoped>
.el-table{
    height: 100% !important;
}

</style>
  