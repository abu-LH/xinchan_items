<template>

    <el-form label-width="120px">

        <div class='div'>
            <el-button @click="found" v-if='roleTypeStatus'>创建机构</el-button>
        </div>

        <el-input v-model="input3" style="width:70%" placeholder="搜索框" class="input-with-select">
            <template #append>
                <el-button :icon="Search" @click="fn" />
            </template>
        </el-input>
    </el-form>

    <el-table v-if="bol" :data="select.arr" style="width: 70%;">
        <el-table-column prop="id" label="编号" width="180" />
        <el-table-column prop="name" label="机构名称" width="260" />
        <el-table-column prop="legalPerson" label="创建者" />

        <el-table-column fixed="right" label="查看详情">
            <template #default="data">
                <el-button link type="primary" size="small" @click="fm(data.$index)">详情</el-button>
            </template>
        </el-table-column>


    </el-table>

    <div v-else>
        <!-- 显示机构详情 -->
        <div id='divs'>
            <el-form-item label="机构名称：">
                {{form.detail.name}}
            </el-form-item>
            <el-form-item label="法定代表人：">
                {{form.detail.legalPerson}}
            </el-form-item>
            <el-form-item label="营业执照编号：">
                {{form.detail.businessLicense}}
            </el-form-item>
            <el-form-item>
                <template #default="data">
                    <el-button link type="primary" size="small" @click="fbi()">申请加入机构</el-button>
                </template>
            </el-form-item>



        </div>
    </div>
</template>

   

<style scoped>
.div {

    margin: 0 0 50px 820px;
}

#divs {
    width: 800px;


    margin: 30px auto;


}
</style>


<script  setup>
import { ref, reactive, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'

import useGlobal from '../../utils/useGlobal'
const global = useGlobal()
let form = reactive(
    {
        detail: {
            name: '',
            legalPerson: '',
            businessLicense: '',

        }
    })

let    roleTypeStatus = ref(false)

// 控制显示
let bol = ref(true)
// 收集信息发送信息开始 a
const select = reactive(
    {
        arr: []
    }
)
const input3 = ref('')
async function fn() {
    let us = await global.axios.get('/search', {
        params: {
            value: input3.value
        }
    })
    select.arr = us
    bol.value = true
}
// a结束


onMounted(() => {
    lis()
    if(global.data.me.roleType == 'admin'){
        roleTypeStatus.value = true
    }
})
async function lis() {
    let nn = await global.axios.get('/search', {
        params: {
            value: ''
        }
    })
    select.arr = nn
}

// 查看详情

async function fm(e) {
    // console.log(index)

    // console.log(select.arr[e].id)
    let ms = await global.axios.get('/public/search-detail', {
        params: {
            id: select.arr[e].id
        }
    })
    bol.value = !bol.value
    form.detail = ms[0]
    console.log(ms)
}
// 申请加入机构
let fbi = () => {
    global.router.push({
        name: 'Theadministrator', query: {
            id: form.detail.id
        }
    })

}



//创建机构
let found = () => {

    global.router.push({
        name: 'school-apply',
         query: {
            id: form.detail.id
        }
    })


}
onMounted(() => {
    global.bus.emit('pageBack', 1)
})


</script>
  