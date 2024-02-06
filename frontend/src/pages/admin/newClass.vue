<template>
    <!-- 新增课程等等 -->
    <el-card class="box-card" v-if="bol">
        <div slot="header" class="clearfix">
            <span>请编辑新班级信息</span>
        </div>

        <el-container>
            <el-aside width="20%">
                <div class="input">班级名：<el-input class="input-text" size="small" v-model="newClass"></el-input></div>

                <div class="input">班级教师: 
                    <el-select v-model="newClassTeacher" class="m-2" size="small">
                        <el-option
                            v-for="item in teachers"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </div>

                <el-button type="success" plain @click="addClass">确定</el-button>
                <el-button type="danger" plain @click="cancelAdd">取消</el-button>
            </el-aside>

            <el-main>
                <div>学生列表</div>

                <el-transfer v-model="newClassStudents" :data="data" :titles="['未加入本班的学生', '已加入本班的学生']"/>
            </el-main>
        </el-container>
    </el-card>

    <el-row class="mb-4">
        <el-button type="primary" plain @click="add()">新增班级</el-button>
    </el-row>

    <el-card class="box-card" v-if="thisUsers">

        <div slot="header" class="clearfix">
            <div>班级名：{{ thisClassName }}</div><br>
            <div>当前任课教师：{{ thisTeacher.name }}</div><br>
            <div>本班学生列表</div>
        </div>

        <el-table :data="thisStudentsName" >
            <el-table-column prop="name" label="名字"></el-table-column>

            <el-table-column prop="username" label="用户名"></el-table-column>
        </el-table>

        <el-button type="danger" plain size="small" class="close" @click="closeCard">关闭</el-button>

    </el-card>


    <el-card class="box-card" v-if="edit">
    
        <div slot="header" class="clearfix">
            <div>请更新班级信息</div><br>
        </div>

        <el-container>
            <el-aside width="20%">
                <div class="input">班级名：<el-input class="input-text" size="small" v-model="thisClassName"></el-input></div>

                <div class="input">班级教师: 
                    <el-select v-model="thisTeacher.id" class="m-2" size="small">
                        <el-option
                            v-for="item in teachers"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </div>

                <div class="input">班级课程: 
                    <el-select v-model="newCourseId" class="m-2" size="small">
                        <el-option
                            v-for="item in courses"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </div>

                <el-button type="success" plain @click="updateClass">确定</el-button>
                <el-button type="danger" plain @click="cancelEdit">取消</el-button>
            </el-aside>

            <el-main>
                <div>学生列表</div>

                <el-transfer v-model="thisStudents" :data="data" :titles="['未加入本班的学生', '已加入本班的学生']"/>
            </el-main>
        </el-container>


    
    </el-card>


    <el-table :data="tableData" >

        <el-table-column fixed prop="name" label="班级">
            <template #default="scope">
                <el-input v-if="tableData[scope.$index].boolean" v-model="tableData[scope.$index].Class" class='editput' />
            </template>
        </el-table-column>

        <el-table-column prop="courseName" label="课程">
            <template #default="scope">
                <el-input v-model="tableData[scope.$index].course" v-if="tableData[scope.$index].boolean" class='editput' />
            </template>
        </el-table-column>

        <el-table-column fixed="right" label="操作">
            <template #default="scope">
                <el-button link type="primary" size="small" @click="delClass(scope.$index)">删除</el-button>

                <el-button link type="primary" size="small" @click="getClassesUsers(scope.$index)">查看教师和学生</el-button>

                <el-button link type="primary" size="small" @click="editClass(scope.$index)">编辑班级信息</el-button>       
            </template>
        </el-table-column>
    </el-table>
    <!-- <el-button class="mt-4" style="width: 100%" @click="onAddItem">Add Item</el-button> -->

</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import useGlobal from '../../utils/useGlobal'

const global = useGlobal()
let schoolId = global.data.me.schoolId

let bol = ref(false)                // 新增班级卡片显示
let thisUsers = ref(false)          // 特定班级用户信息查询卡片显示
let edit = ref(false)               // 信息编辑卡片显示

let tableData = reactive([]) as any
let courses = reactive([]) as any

// 查询基础班级信息
async function getClassesData() {
    let getClassesData = (await global.axios.get('/admin/getClasses',
        { params: { schoolId: schoolId } }))

    let getCoursesData = (await global.axios.get('/admin/getCourses',
        { params: { schoolId: schoolId } }))
    getCoursesData.forEach(item => courses.push(item))

    getClassesData.forEach(item => {
        let courseName = ref('')
        let courseId = ref('')

        for(let i of getCoursesData){  
            if(item.courseId == i.id){
                courseName.value = i.name
                courseId.value = i.id
            }
        }
        tableData.push({
            name: item.name,
            id: item.id,
            courseName: courseName.value,
            courseId: courseId.value
        })
    })
}
getClassesData()

// 查询所有的用户
let teachers = reactive([]) as any     // 教师的表格
let students = reactive([]) as any     // 学生的表格

async function getUsers() {
    let result = (await global.axios.get('/admin/normalUsers',
        {params: {schoolId} }
    ))
    result.forEach(item => {
        if(item.role == '教师'){
            teachers.push(item)
        }else if(item.role == '学生'){
            students.push(item)
        }
    })
}
getUsers()

// 查询特定班级的教师和学生
let thisTeacher = ref({}) as any       // 特定班级的教师信息
let thisStudents = ref([]) as any      // 特定班级的学生id
let thisStudentsName = ref([]) as any  // 特定班级的学生信息
let getClassId = ref('')               // 特定班级的id
let thisClassName = ref('')            // 特定班级的名字

// 查询班级与用户id的关系表
let classes_users = reactive([]) as any

async function classesUsers() {
    let result = (await global.axios.get('/admin/getClassesUsers',
        {params: {schoolId} }
    ))
    result.forEach(item => classes_users.push(item))
}
classesUsers()

function getClassesUsers(index) {
    closeCard()
    cancelEdit()
    cancelAdd()

    thisTeacher.value = {
        name: '暂无',
        id: ''
    }
    thisStudents.value.length = 0
    thisStudentsName.value.length = 0
    thisUsers.value = true
    getClassId.value = tableData[index].id
    thisClassName.value = tableData[index].name

    for(let i of classes_users){
        if(i.classId == getClassId.value){
            for(let j of teachers){
                if(j.id == i.userId){
                    thisTeacher.value.name = j.name
                    thisTeacher.value.id = j.id
                }
            }

            for(let j of students){
                if(j.id == i.userId){
                    thisStudents.value.push(j.id)
                    thisStudentsName.value.push({
                        name: j.name,
                        username: j.username
                    })
                }
            }
        }
    }

}

// 关闭特定班级的用户查询信息卡片
function closeCard(){
    thisUsers.value = false
    thisTeacher.value = {
        name: '暂无',
        id: ''
    }
    thisStudents.value.length = 0
    getClassId.value = ''
    thisClassName.value = ''
}

// 删除班级
async function deleteClass(oldClassId) {
    let deleteClass = await global.axios.post('/admin/deleteClass', {
        newData: [oldClassId]
    })
}

function delClass(index){
    let oldClassId = tableData[index].id
    deleteClass(oldClassId)
    tableData.splice(index, 1)

    for(let i = classes_users.length - 1; i >= 0; i--){
        if(classes_users[0].classId == oldClassId){
            classes_users.splice(i, 1)
        }
    }
}


// 点击新增选项事件
function add(){
    closeCard()
    cancelEdit()
    cancelAdd()

    bol.value = true
    students.forEach(item => data.push({
        label: item.name,
        key: item.id,
    }))

    teachers.unshift({
        id: '',
        schoolId: 0,
        username: 'none',
        name: '暂无教师'
    })
}

// 穿梭框信息
interface Option {
  key: number
  label: string
}

let generateData = () => {
  let data: Option[] = reactive([])
  return data
}

let data = reactive<Option[]>(generateData()) as any

// 取消新增
function cancelAdd(){
    bol.value = false
    newClass.value = ''
    newClassStudents.value.length = 0
    newClassTeacher.value = ''
    data.length = 0
}

// 新增班级
let newClass = ref('')                  // 新班级的名字
let newClassTeacher = ref('') as any    // 新班级的当前教师id
let newClassStudents = ref([])          // 新班级的学生id，是一个数组

async function addClass() {
    let addClass = await global.axios.post('/admin/addClass', {
        newData: [{
            schoolId,
            name: newClass.value,
            teacher: newClassTeacher.value,
            students: newClassStudents.value
        }]
    })

    let getNewClass = (await global.axios.get('/admin/getNewClass',
        { params: { 
            newClass: newClass.value, 
            schoolId }}
    ))

    if(newClassTeacher.value - 0 != 0){
        let updateTeachers = await global.axios.post('/admin/addClassesUsers', {
            newData: [{
                classId: getNewClass[0].id,
                users: [newClassTeacher.value],
                isTeacher: 1
            }]
        })
    }

    if(newClassStudents.value.length > 0){
        let updateStudents = await global.axios.post('/admin/addClassesUsers', {
            newData: [{
                classId: getNewClass[0].id,
                users: newClassStudents.value,
                isTeacher: 0
            }]
        })
    }

    tableData.push({
        name: newClass.value,
        id: getNewClass[0].id,
        courseName: '',
        courseId: ''
    })

    classes_users.push({
        classId: getNewClass[0].id,
        userId: newClassTeacher.value,
        isTeacher: 1
    })

    for(let i of newClassStudents.value){
        classes_users.push({
            classId: getNewClass[0].id,
            userId: i,
            isTeacher: 0
        })
    }

    cancelAdd()
}

// 编辑班级基础信息
let newCourseId = ref('')       // 新课程的id
let thisClassId = ref('')       // 需要编辑的班级id
let thisIndex = ref('')

function editClass(index){      // 选择需要编辑的班级
    closeCard()
    cancelEdit()
    cancelAdd()

    getClassesUsers(index)

    thisUsers.value = false
    edit.value = true

    thisClassId.value = tableData[index].id
    newCourseId.value = tableData[index].courseId
    thisIndex.value = index

    students.forEach(item => data.push({
        label: item.name,
        key: item.id,
    }))

    teachers.unshift({
        id: '',
        schoolId: 0,
        username: 'none',
        name: '暂无教师'
    })

    courses.unshift({
        id: '',
        schoolId: 0,
        name: '暂无课程',
    })
}

// 编辑完成
async function updateClass() {
    let thisUserData = reactive([]) as any
    for(let i of thisStudents.value){
        thisUserData.push({
            id: i,
            isTeacher: 0
        })
    }
    thisUserData.push({
        id: thisTeacher.value.id,
        isTeacher: 1
    })

    let updateClass = await global.axios.post('/admin/updateClasses', {
        newData: [{
            classId: thisClassId.value,
            newCourseId: newCourseId.value,
            name: thisClassName.value,
            teacher: thisTeacher.value.id,
            students: thisStudents.value
        }]
    })

    tableData[thisIndex.value].name = thisClassName.value

    let updateUsers = await global.axios.post('/admin/updateClassesUsers', {
        newData: [{
            classId: thisClassId.value,
            users: thisUserData
        }]
    })

    for(let i of courses){
        if(i.id == newCourseId.value){
            tableData[thisIndex.value].courseName = i.name
        }
    }

    for(let i = classes_users.length - 1; i >= 0; i--){
        if(classes_users[i].classId == thisClassId.value){
            classes_users.splice(i, 1)
        }
    }

    classes_users.push({
        classId: thisClassId.value,
        userId: thisTeacher.value.id,
        isTeacher: 1
    })

    for(let i of thisStudents.value){
        classes_users.push({
            classId: thisClassId.value,
            userId: i,
            isTeacher: 0
        })
    }

    cancelEdit()
}

// 取消编辑
function cancelEdit(){
    edit.value = false

    newCourseId.value = ''
    thisClassId.value = ''
    thisIndex.value = ''
    thisClassName.value = ''

    data.length = 0
    for(let i in teachers){
        if(teachers[i].id == 0){
            teachers.splice(i, 1)
        }
    }

    for(let i in courses){
        if(courses[i].id == 0){
            courses.splice(i, 1)
        }
    }
}

</script>

<style scoped>
* {
    font-size: 14px;
}

.box-card {
    width: 70%;
    position: absolute;
    z-index: 10;
}

.input-text{
    width: 6rem;
}

.m-2{
    width: 6rem;
}

.input{
    padding-bottom: 2rem;
}


.editput {
    width: 14.9rem;
    height: 1.6rem;
}

.close{
    position: absolute;
    top: 1rem;
    right: 1rem;
}

</style>
  