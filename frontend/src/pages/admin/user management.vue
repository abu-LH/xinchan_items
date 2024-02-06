<template>
    <el-table :data="tableData">
        <el-table-column fixed prop="username" label="用户名">
            <template #default="scope">
                <el-input v-if="user.userIndex == scope.$index" v-model="tableData[scope.$index].username"
                    class='editput' />
            </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名">
            <template #default="scope">
                <el-input v-if="user.userIndex == scope.$index" v-model="tableData[scope.$index].name"
                    class='editput' />
            </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号">
            <template #default="scope">
                <el-input v-if="user.userIndex == scope.$index" v-model="tableData[scope.$index].phone"
                    class='editput' />
            </template>
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
            <template #default="scope">
                <el-input v-if="user.userIndex == scope.$index" v-model="tableData[scope.$index].email"
                    class='editput' />
            </template>
        </el-table-column>
        <el-table-column prop="identityNo" label="身份证号">
            <template #default="scope">
                <el-input v-if="user.userIndex == scope.$index" v-model="tableData[scope.$index].identityNo"
                    class='editput' />
            </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="deleteUsers(scope.$index)">移除</el-button>

                <el-button link type="primary" size="small" @click="done(scope.$index)" v-if="user.userIndex == scope.$index">完成</el-button>

                <el-button link type="primary" size="small" @click="update(scope.$index)" v-else>编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <!-- <el-button class="mt-4" style="width: 100%" @click="onAddItem">Add Item</el-button> -->
</template>
   
<script lang="ts" setup>


// import { id } from 'element-plus/es/locale';
import { ref, reactive } from 'vue'
import useGlobal from '../../utils/useGlobal'

const global = useGlobal()
let tableData = reactive([]) as any

// 查询用户
async function usersAudit() {
    let schoolId = global.data.me.schoolId
    let result = (await global.axios.get('/admin/normalUsers',
        {params: {schoolId: schoolId}}
    ))
    result.forEach(item => tableData.push({
        name: item.name,
        username: item.username,
        id: item.id,
        phone: item.phone,
        email: item.email,
        identityNo: item.identityNo,
        boolean: false
    }))
}
usersAudit()

// 编辑信息
let user = ref({            // 需要编辑的用户的信息，是一个对象
    id: ' ',
    name: ' ',
    phone: ' ',
    email: ' ',
    username: ' ',
    identityNo: ' ',
    userIndex: -1
})

// 编辑事件
function update(index){
    user.value.userIndex = index
}

// 用户信息编辑完成事件
function done(index){
    user.value.userIndex = -1
    user.value.id = tableData[index].id
    user.value.name = tableData[index].name
    user.value.phone = tableData[index].phone
    user.value.email = tableData[index].email
    user.value.username = tableData[index].username
    user.value.identityNo = tableData[index].identityNo

    updateUser(user)
}


async function updateUser(user){
    let result = await global.axios.post('/admin/updateUser', {
        newData: [{
            username: user.value.username,
            name: user.value.name,
            phone: user.value.phone,
            email: user.value.email,
            id: user.value.id,
            identityNo: user.value.identityNo,
        }]
    })

    user = ref({
        id: ' ',
        name: ' ',
        phone: ' ',
        email: ' ',
        username: ' ',
        identityNo: ' ',
        userIndex: -1
    })
}


// 移除用户
async function deleteUsers(index) {
    let result = await global.axios.post('/admin/deleteUsers', {
        oldData: [{
            name: tableData[index].name,
            id: tableData[index].id
        }]
    })

    tableData.splice(index, 1)
    user.value.userIndex = -1
}
</script>
  
<style>
* {
    font-size: 14px;
}

.editput {
    width: 14.9rem;
    height: 1.6rem;
}
</style>