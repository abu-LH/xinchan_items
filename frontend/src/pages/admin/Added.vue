<template>
    <el-row class="mb-4">
        <el-button type="primary" plain @click="displayClasses">新增课程</el-button>
    </el-row>

    <el-card class="box-card" v-if="bol">
        <div class="text item">
            <el-form-item label="输入课程：">
                <el-input v-model="newCourse" class='put' />
            </el-form-item>

        </div>
        <el-button type="success" class="btn" @click="btnYes" plain>确定</el-button>
        <el-button type="danger" class="btn" @click="btnNo" plain>取消</el-button>
    </el-card>

    <el-card class="box-card" v-if="edit">
    
        <div slot="header" class="clearfix">
            <div>请更新课程信息</div><br>
        </div>

        <el-container>
            <el-aside width="20%">
                <div class="input">课程名：<el-input class="input-text" size="small" v-model="newCourseName"></el-input></div>

                <el-button type="success" plain @click="updateCourse">确定</el-button>
                <el-button type="danger" plain @click="cancelEdit">取消</el-button>
            </el-aside>

            <el-main>
                <div>班级列表</div>
                <el-transfer v-model="newClasses" :data="data" :titles="['没有课程的班级', '已上本课程的班级']"/>
            </el-main>
        </el-container>
    </el-card>


    <el-table :data="tableData">

        <el-table-column fixed prop="name" label="课程">

        </el-table-column>

        <el-table-column prop="classes" label="班级" :show-overflow-tooltip="true">

        </el-table-column>


        <el-table-column fixed="right" label="操作" width="120">
            <template #default="scope">
                <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index)">删除</el-button>
                <!-- 编辑 -->
                <el-button link type="primary" size="small" @click="eadtingBtn(scope.$index)">编辑</el-button>


            </template>
        </el-table-column>
    </el-table>

</template>
  
<script lang="ts" setup>
import { ref, h, reactive } from 'vue'
import { ElNotification } from 'element-plus'
import useGlobal from '../../utils/useGlobal'
import { forEach } from 'lodash';

const global = useGlobal()



// 添加课程的信息
let newCourse = ref('') as any        // 新课程的名字，通过输入的方式加入

// 需要删除的课程信息
let courseId = ref('') as any        // 需要删除的课程id

// 获得信息并整合为一个信息表格
let tableData = ref([]) as any
let course = ref([]) as any
let classes = ref([]) as any
let schoolId = global.data.me.schoolId

async function getTableData() {
    let getCourses = (await global.axios.get('/admin/getCourses',
        { params: { schoolId: schoolId } }))
    getCourses.forEach(item => course.value.push(item))

    let getClasses = (await global.axios.get('/admin/getClasses',
        { params: { schoolId: schoolId } }))
    getClasses.forEach(item => classes.value.push(item))

    for (let i of course.value) {
        let thisCourses = {
            name: i.name,
            classes: '',
            id: i.id,
        }
        for (let j of classes.value) {
            if (j.courseId == i.id) {
                thisCourses.classes += (j.name + ' ')
            }
        }
        tableData.value.push(thisCourses)
    }
}
getTableData()

//删除
function deleteRow(index) {
    courseId.value = tableData.value[index].id
    delateCourse(index)
    tableData.value.splice(index, 1)
}
async function delateCourse(index) {
    let updateClassCourse = await global.axios.post('/admin/deleteClassCourse', {
        newData: [{
            courseId: courseId.value
        }]
    })

    let deleteCourse = await global.axios.post('/admin/deleteCourse', {
        newData: [{
            id: courseId.value,
            schoolId
        }]
    })

    for(let i = course.value.length - 1; i >= 0; i--){
        if(course.value[i].id == tableData.value[index].id){
            course.value.splice(i, 1)
        }
    }

    for(let i of classes.value){
        if(i.courseId == tableData.value[index].id){
            i.courseId = 0
        }
    }
}

//编辑
let edit = ref(false)
let newCourseName = ref('') as any
let newClasses = ref([]) as any
let thisCourseId = ref('')
let thisClasses = ref('')

interface Option {
  key: number
  label: string
}

let generateData = () => {
  let data: Option[] = reactive([])
  return data
}

let data = reactive<Option[]>(generateData()) as any

function eadtingBtn(index) {
    edit.value = true
    btnNo()
    newCourseName.value = tableData.value[index].name
    thisCourseId.value = tableData.value[index].id

    for(let i of classes.value){
        if(i.courseId == tableData.value[index].id){
            newClasses.value.push(i.id)
        }
    }

    classes.value.forEach(item => {
        if(item.courseId == 0 || item.courseId == thisCourseId.value)
            {
                data.push({
                    label: item.name,
                    key: item.id,
                })
            }
    })

    thisClasses.value = index
}


// 编辑完成后更新后台数据
async function updateCourse() {
    let updateCourse = await global.axios.post('/admin/updateCourse', {
        newData: [{
            id: thisCourseId.value,
            name: newCourseName.value
        }]
    })

    let deleteClassCourse = await global.axios.post('/admin/deleteClassCourse', {
        newData: [{
            courseId: thisCourseId.value,
        }]
    })

    for(let i of classes.value){
        if(i.courseId == thisCourseId.value){
            i.courseId = 0
        }
    }


    if(newClasses.value.length > 0){
        let updateClassCourse = await global.axios.post('/admin/updateClassCourse', {
            newData: [{
                courseId: thisCourseId.value,
                classes: newClasses.value
            }]
        })
    }

    tableData.value[thisClasses.value].classes = ''
    for(let i of newClasses.value){
        for(let j of classes.value){
            if(i == j.id){
                tableData.value[thisClasses.value].classes += (j.name + ' ')
                j.courseId = thisCourseId.value
            }
        }
    }

    tableData.value[thisClasses.value].name = newCourseName.value

    cancelEdit()
}

// 取消编辑
function cancelEdit(){
    edit.value = false
    newCourseName.value = ''
    thisCourseId.value = ''
    newClasses.value.length = 0
    data.length = 0
}

// 点击添加课程事件，并显示班级列表
const bol = ref(false)
function displayClasses() {
    console.log(classes.value)  // 得到班级列表classes.value，可以直接用
    bol.value = true
}
//点击添加课程
function btnYes() {

    addCourse()
    cancelEdit()
}
function btnNo() {
    bol.value = false
}


// 新增课程信息添加完成
async function addCourse() {
    let addCourse = await global.axios.post('/admin/addCourse', {
        newData: [{
            schoolId,
            name: newCourse.value
        }]
    })

    let getNewCourse = (await global.axios.get('/admin/getNewCourses',
        { params: { 
            newCourse: newCourse.value, 
            schoolId }}
    ))

    tableData.value.push({
        name: newCourse.value,
        id: getNewCourse[0].id,
        classes: ''
    })

    course.value.push({
        id: getNewCourse[0].id,
        name: newCourse.value,
        schoolId
    })

    btnNo()
}

</script>

<style scoped>
* {
    font-size: 14px;
}

.text {
    font-size: 1rem;
}

.item {
    padding: 1.2rem 0;
}

.put {
    margin-top: .33rem;
    width: 10rem;
}

.btn {
    text-align: left;
}


.input{
    padding-bottom: 2rem;
}
</style>
  