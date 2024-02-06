<template>
    <el-container>
        <el-aside class="aside">
            <el-form label-position="right" class="contentRight">
                <el-form-item label="姓名">
                    <el-input v-model="user.detail.name" class="inf" readonly=true />
                </el-form-item>

                <el-form-item label="申请人身份">
                    <!-- <span class="inf">{{ user.detail.identity }}</span> -->
                    <el-input v-model="user.detail.identity" class="inf" readonly=true />
                </el-form-item>

                <el-form-item label="手机号">
                    <!-- <span class="inf">{{ user.detail.phone }}</span> -->
                    <el-input v-model="user.detail.phone" class="inf" readonly=true />
                </el-form-item>

                <el-form-item label="身份证">
                    <!-- <span class="inf">{{ user.detail.IDnumber }}</span> -->
                    <el-input v-model="user.detail.IDnumber" class="inf" readonly=true />
                </el-form-item>

                <el-form-item label="身份证照片">
                    <span class="pic"><el-image :src="user.detail.identityCardFrontsidePhoto"></el-image></span>
                    <span class="pic"><el-image :src="user.detail.identityCardBacksidePhoto"></el-image></span>
                </el-form-item>
            </el-form>

            <el-row class="buttons">
                <el-button @click="agree">通过</el-button>
                <el-button type="danger" plain @click="refuse">拒绝</el-button>
            </el-row>
        </el-aside>

        <el-main>
            <el-table :data="tableData" height="400" style="width: 14rem" class="table">
                <el-table-column prop="name" label="姓名">
                </el-table-column>

                <el-table-column label="操作">
                    <template #default="scope">
                        <el-button type="text" size="small" @click.prevent="viewUser(scope.$index)">查看</el-button>
                    </template>
                </el-table-column>

            </el-table>
        </el-main>

        
    </el-container>
</template>

<style>
.inf {
    /* background-color:rgb(240, 255, 255); */
    /* padding-left: 0.7rem; */
    width: 15.6rem;
    height: 1.8rem;
}

.pic {
    width: 20rem;
    height: 12.643rem;
    display: inline-block; 
    margin-right: 1.429rem;
    margin-bottom: 1.429rem;
}

.table {
    border: 0.07rem #E9EEF3 solid;
    margin: auto auto;
}

.buttons {
    margin-left: 12rem;
}
</style>

<script setup>
import useGlobal from '../../utils/useGlobal.js'
import axios from 'axios';
import { ref, onMounted, reactive } from "vue"
import { ElForm, ElInput, ElFormItem, ElButton, ElSelect, ElOption, ElMessageBox, ElMessage} from 'element-plus'

const global = useGlobal()
const picUrl = global.filesBaseUrl

//加载获取用户信息
console.log(picUrl)

let Id;
let user = reactive(
    {detail: {
        name: '请在右边列表中选择人员',
        identity: '',
        phone: '',
        IDnumber: '',
        Id: '',
        identityCardFrontsidePhoto: '',
        identityCardBacksidePhoto: '',
        index: -1,
        }
    })

let tableData = ref([])

async function usersAudit() {
    let result = (await global.axios.get('/admin/usersAudit'))
    result.forEach(item => tableData.value.push(item))

    if(result.length == 0){ElMessage('目前没有可以审核的人员')}
}
usersAudit()

function viewUser (index){
    if(index != -1){
        user.detail.name = tableData.value[index].name
        user.detail.identity = tableData.value[index].role
        user.detail.phone = tableData.value[index].phone
        user.detail.Id = tableData.value[index].id
        user.detail.IDnumber = tableData.value[index].identityNo
        user.detail.identityCardFrontsidePhoto = picUrl + tableData.value[index].identityCardFrontsidePhoto
        user.detail.identityCardBacksidePhoto = picUrl + tableData.value[index].identityCardBacksidePhoto
        user.detail.index = index
    }else{
        user.detail.name = ''
        user.detail.identity = ''
        user.detail.phone = ''
        user.detail.Id = ''
        user.detail.IDnumber = ''
        user.detail.identityCardFrontsidePhoto = ''
        user.detail.identityCardBacksidePhoto = ''
        user.detail.index = -1
    }
}

const agree = async () => {
    if(user.detail.index != -1){
        let result = await global.axios.post('/admin/agreeApply',{
            Id:user.detail.Id
        })
        if(result.error){
            console.log(result.error)
        }else if(result.affectedRows===1){
            tableData.value.splice(user.detail.index, 1)
            viewUser(-1)
        }
    }
}

const refuse = async () => {
    if (user.detail.index != -1) {
        let result = await global.axios.post('/admin/refuseApply', {
            Id: user.detail.Id
        })
        if (result.error) {
            console.log(result.error)
        } else if (result.affectedRows === 1) {
            tableData.value.splice(user.detail.index, 1)
            viewUser(-1)
        }
    }
}



</script>    