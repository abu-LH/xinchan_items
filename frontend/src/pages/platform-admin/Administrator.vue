<template>
 
    <el-table :data="tableData.arr" style="width: 100%"> 
        <el-table-column fixed prop="id"    label="Id" width="60" />
        <el-table-column prop="schoolId"    label="学校id" width="80" />
        <el-table-column prop="schoolName"  label="学校名称" width="220" />
        <el-table-column prop="role"        label="身份" width="120" />
        <el-table-column prop="roleType"    label="身份类型" width="120" />
        <el-table-column prop="status"      label="状态" width="120" />
        <el-table-column prop="username"    label="用户名" width="120" />
        <el-table-column prop="name"        label="姓名" width="120" />
        <el-table-column prop="gender"      label="性别" width="120" />
        <el-table-column prop="phone"       label="电话" width="120" />
        <el-table-column prop="email"       label="邮箱" width="120" />
        <el-table-column prop="createTime"  label="创建时间" width="120" />
        <el-table-column prop="updateTime"  label="更新时间" width="120" />

         <el-table-column>
            <template #default='data'>
                <el-button link type="primary" size="small" @click="del(data.$index)">删除</el-button>
 
            </template>
        </el-table-column> 
    </el-table>
</template>
  
<script lang="ts" setup>
import {reactive,onMounted} from 'vue'
import useGlobal from '../../utils/useGlobal'

const global = useGlobal()



const tableData =reactive( {
    arr:[{
        id:'',
        schoolId:'',
        schoolName:'',
        name:'',
        role:'',
        roleType:'',
        status:'',
        username:'',
        gender:'',
        phone:'',
        email:'',
        createTime:'',
        updateTime:'',

    }] 
})

onMounted(()=>{
    request()
})
 
 async function request(){
    let e = await global.axios.get('/platform-admin/admin')
   
    tableData.arr=e

}

    
//删除
async function del(e){
let ms = await global.axios.post('/platform-admin/remove-user',{

    id:tableData.arr[e].id
    
})
tableData.arr.splice(tableData.arr[e],1) 

}
  
</script>
<style scoped>
.el-table{
    height: 100% !important;
}

</style>
  