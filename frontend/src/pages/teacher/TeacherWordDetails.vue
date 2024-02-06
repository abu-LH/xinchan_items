<template>
    <el-form label-width="120px">
        <el-descriptions :column="1" border>
            <el-descriptions-item label="课次名称" label-align="right" align="center" label-class-name="my-label"
                class-name="my-content" size="large" class="des-item">{{coursewareMessage.name}}</el-descriptions-item>
            <el-descriptions-item label="课次时间" class="des-item" label-align="right" align="center">
                {{coursewareMessage.startTime}}
            </el-descriptions-item>
            <el-descriptions-item label="课件列表" label-align="right" class="des-item" align="center">
                <FileList v-model="coursewareMessage.coursewareFiles" readonly></FileList>
            </el-descriptions-item>
            <el-descriptions-item label="作业列表" label-align="right" class="des-item" align="center">
                <FileList v-model="coursewareMessage.homeworkFiles" readonly></FileList>
            </el-descriptions-item>
        </el-descriptions>

        <div class="work">
            <h3>作业提交列表</h3>
            <el-table :data="tableData2" class="worktable" style="width: 60%">
                <el-table-column prop="date" :formatter="formatData" />
                <el-table-column prop="name" />
                <el-table-column prop="file">
                    <template #default="scope">
                        <FileList v-model="scope.row.file" readonly></FileList>
                    </template>
                </el-table-column>
            </el-table>
        </div>


        <el-form-item label="备注">
            <el-input type="textarea" readonly :value='remarkValue' />
        </el-form-item>
        <el-form-item label="批改评语">
            <el-input v-model="comment" type="textarea" />
        </el-form-item>

        <el-button type="primary" size="large" @click="submitRemark" auto-insert-space>批改</el-button>
    </el-form>
</template>
<script setup>
import FileList from '@/components/FileList.vue'
import { onMounted, reactive, ref, toRefs } from 'vue'
import useGlobal from '@/utils/useGlobal.js'
import { ElMessage } from 'element-plus'

const global = useGlobal()



//获得备注信息
let remarkValue = ref('')


// 获取当前展示的课件信息
let coursewareMessage = reactive({
    name: '',
    startTime: '',
    coursewareFiles: '',
    homeworkFiles: '',
    studentId: ''
})
// 课次展示列表
async function getCourseList() {

    let homeworkId = global.router.currentRoute.value.query.id

    let result = await global.axios.get('/teacher/classtimes', {
        params: {
            id: homeworkId
        }
    })
    if (result.length == 0) {
        coursewareMessage.name = '没查到'
        coursewareMessage.startTime = '没查到'
        coursewareMessage.coursewareFiles = []
        coursewareMessage.homeworkFiles = []
    } else {
        coursewareMessage.name = result[0].name
        coursewareMessage.startTime = new Date(result[0].startTime).toLocaleString()
        coursewareMessage.coursewareFiles = result[0].coursewareFiles
        coursewareMessage.homeworkFiles = result[0].homeworkFiles
    }
}



onMounted(() => {
    getCourseList()
})

// 作业提交列表
const tableData2 = reactive([])

async function homeWorkSubmissionList() {
    let id = global.router.currentRoute.value.query.stuId
    let result = await global.axios.get('/teacher/studenthomeworklist', {
        params: {
            id: id
        }
    })

    result.forEach(item => {
        if (item.files) {
            let homeWork = {
                date: item.updateTime,
                name: item.name,
                file: item.files,
            }
            tableData2.push(homeWork)
            remarkValue.value = item.remark
        }

    })
}
onMounted(() => {
    homeWorkSubmissionList()
})





// 提交评语
const comment = ref('')
async function submitRemark() {
    if (comment == '') {
        ElMessage({
            type: 'warning',
            message: '请输入内容',
        })
        return false
    }
    let id = global.router.currentRoute.value.query.stuId
    let rusult = await global.axios.post('/teacher/submitreview', {
        val: [comment.value, id]
    })

    comment.value = ''
    ElMessage({
        type: 'success',
        message: '提交成功',
    })
}

//时间格式
function formatData(row, column, cellValue, index) {
    let s = new Date(cellValue).toLocaleString();
    return s;
}


function goto() {
    global.$router.push({
        name: 'homework'
    })
}
global.bus.off('classChange', goto)
global.bus.on('classChange', goto)


</script>

<style scoped>
.work {
    margin: 20px auto 10px auto;
}

.worktable {
    margin: 0 auto;
}

.el-tag {
    margin: 0 10px;
}
</style>