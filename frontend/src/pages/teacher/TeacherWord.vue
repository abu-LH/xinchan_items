<template>
    <el-tabs type="border-card">
        <el-tab-pane label="所有">
            <el-select v-model="selectValue" class="m-2" placeholder="课次作业">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-table :data="allHomeWork" border style="width: 100%">
                <el-table-column prop="updateTime" :formatter="formatData" label="时间" sortable />
                <el-table-column prop="studentName" label="学生" />
                <el-table-column prop="classTimeName" label="课次" />
                <el-table-column prop="files" label="Zip">
                    <template #default="scope">
                        <FileList v-model="scope.row.files" readonly></FileList>
                    </template>
                </el-table-column>
                <el-table-column label="Operations">
                    <template #default="item">
                        <el-button link type="primary" size="small"
                            @click="handleClick(item.row.id,item.row.studentId)">查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <h1>补交作业</h1>
            <el-table :data="undoneHomeWork" border style="width: 100%">
                <el-table-column prop="updateTime" :formatter="formatData" label="时间" sortable />
                <el-table-column prop="studentName" label="学生" />
                <el-table-column prop="classTimeName" label="课次" />
                <el-table-column prop="files" label="Zip">
                    <template #default="scope">
                        <FileList v-model="scope.row.files" readonly></FileList>
                    </template>
                </el-table-column>
                <el-table-column label="Operations">
                    <template #default="item">
                        <el-button link type="primary" size="small"
                            @click="handleClick(item.row.id,item.row.studentId)">查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="已交">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="updateTime" :formatter="formatData" label="时间" sortable />
                <el-table-column prop="studentName" label="学生" />
                <el-table-column prop="classTimeName" label="课次" />
                <el-table-column prop="files" label="Zip">
                    <template #default="scope">
                        <FileList v-model="scope.row.files" readonly></FileList>
                    </template>
                </el-table-column>
                <el-table-column label="Operations">
                    <template #default="item">
                        <el-button link type="primary" size="small"
                            @click="handleClick(item.row.id,item.row.studentId)">查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="未交">
            <el-table :data="undoneData" border style="width: 100%">
                <el-table-column prop="updateTime" :formatter="formatData" label="时间" sortable />
                <el-table-column prop="studentName" label="学生" />
                <el-table-column prop="classTimeName" label="课次" />
                <el-table-column label="Operations">
                    <template #default="item">
                        <el-button link type="primary" size="small"
                            @click="handleClick(item.row.id,item.row.studentId)">查看
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
    </el-tabs>
</template>

<script setup>
import FileList from '@/components/FileList.vue'
import useGlobal from '@/utils/useGlobal.js'

import { onMounted, onUnmounted, reactive, ref, computed } from 'vue'

const global = useGlobal()



// 获取课次选项列表
const selectValue = ref('')
const options = reactive([
    {
        value: '全部',
        label: '全部',
    },
])
async function getCourseData() {
    let result = await global.axios.get('/teacher/coursedata', {
        params: {
            id: global.data.currentClassId
        }
    })
    console.log('getCourseData', result);
    options.length = 1
    if (result.length >= 1) {
        result.forEach(item => {
            options.push({
                value: item.name,
                label: item.name,
            })
        })

        let id = result[0].id
        getTodayHomeWork(id)
        getMakeUpHomeWork(id)
    }

}
getCourseData()
let allHomeWork = computed(() => {
    if (!selectValue.value || selectValue.value == '全部') return tableData
    return tableData.filter(item => item.classTimeName == selectValue.value)
})



//请求当天作业
let tableData = reactive([])
async function getTodayHomeWork(classTimeId) {
    let result = await global.axios.get('/teacher/todayhomework', {
        params: {
            id: classTimeId
        }
    })
    console.log('getTodayHomeWork', result);
    tableData.length = 0
    undoneData.length = 0
    result.forEach(item => {
        if (item.files) {
            tableData.push(item)
        } else {
            undoneData.push(item)
        }
    })
}

// 修改时间格式
function formatData(row, column, cellValue, index) {

    //把传过来的日期进行回炉重造一下，又创建了一个js的 Date对象，进行重新构造，转为String字符串
    //最终返回 s 就可以了
    var s = new Date(cellValue).toLocaleString();
    return s;
    // 测试参数含义：不知道参数是什么含义的就打印出来
    // console.log(row)     	//拿到一行的所有信息，要拿到具体信息,只需要row.XXX 就可以了
    // console.log(column)  	//拿到列的信息
    // console.log(cellValue) //拿到单元格数据，拿到时间 2022-03-18T01:46:08.000+00:00
    // console.log(index)     //拿到索引
}


// 请求补交作业
let makeUpTableData = reactive([])
async function getMakeUpHomeWork(classTimeId) {
    let result = await global.axios.get('/teacher/makeuphomework', {
        params: {
            classId: global.data.currentClassId,
            classTimeId: classTimeId
        }
    })
    console.log('getMakeUpHomeWork', result);
    makeUpTableData.length = 0
    result.forEach(item => {
        // if (item.files) {
            makeUpTableData.push(item)
        // }
    })
}

let undoneHomeWork = computed(() => {
    if (!selectValue.value || selectValue.value == '全部') return makeUpTableData
    return makeUpTableData.filter(item => item.classTimeName == selectValue.value)
})


// 未交作业表格
let undoneData = reactive([])


//跳转作业详情页
function handleClick(id, stuId) {
    global.$router.push({
        // 路由传参
        name: 'teacherworddetails',
        query: {
            id: id,
            stuId
        }
    })
}

// 切换班级
global.bus.off('classChange', getTodayHomeWork)
global.bus.on('classChange', getTodayHomeWork)









</script>

<style scoped>
.m-2 {
    width: 90%;
}

.el-select {
    padding: 0 0 15px 0;
}
</style>