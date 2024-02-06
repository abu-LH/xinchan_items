<template>
    <el-tabs v-model="activeName" type="card" class="demo-tabs">
        <el-tab-pane label="所有" name="first">
            <el-table :data="tableData" border @row-click="headleClick">
                <el-table-column prop="updateTime" label="时间" sortable />

                <el-table-column prop="files" label="我的作业">
                    <template #default="scope">
                        <FileList v-model="scope.row.files" readonly></FileList>

                    </template>


                </el-table-column>

            </el-table>
        </el-tab-pane>
        <el-tab-pane label="已交" name="second">
            <el-table :data="submitted" border @row-click="headleClick">
                <el-table-column prop="updateTime" label="时间" sortable />

                <el-table-column prop="files" label="我的作业">
                    <template #default="scope">
                        <FileList v-model="scope.row.files" readonly></FileList>

                    </template>
                </el-table-column>

            </el-table>
        </el-tab-pane>
        <el-tab-pane label="未交" name="third">
            <el-table :data="unpaid" border @row-click="headleClick">
                <el-table-column prop="updateTime" label="时间" sortable />

                <el-table-column prop="files" label="我的作业">
                    <template #default="scope">
                        <FileList v-model="scope.row.files" readonly></FileList>

                    </template>
                </el-table-column>

            </el-table>
        </el-tab-pane>
    </el-tabs>


</template>

<script  setup>
import useGlobal from '@/utils/useGlobal'
import { ref, onMounted, onBeforeUnmount, onUnmounted } from 'vue'
import FileList from '../../components/FileList.vue'
const global = useGlobal()

let tableData = ref()
let submitted = ref([])
let unpaid = ref([])

const activeName = ref('first')

function headleClick(homeworkDetail) {

    //切换页面
    global.router.push({
        name: 'homeworkDetails',
        query: {
            id: homeworkDetail.classtimeId,
        }
    })

}


onMounted(() => {
    query()
    global.bus.on('classChange', query)
})
onUnmounted(() => {
    global.bus.off('classChange', query)

})

//获取学生作业
let query = async () => {

    tableData.value = await global.axios.get('/student/homeworks', {
        params: {
            homeworkId: global.data.me.id,
            classid: global.data.currentClassId
        }
    })
    // console.log(tableData.value);
    let notover = 0;
    let over = 0;
    tableData.value.forEach(element => {

        //转换时间格式
        let time = new Date(element.updateTime).toLocaleString();
        //  console.log(time);
        element.updateTime = time

        if (element.files) {

            over++             //已交
            submitted.value.push(element)
            submitted.value.length = over

        } else {
            notover++;
            unpaid.value.push(element)
            unpaid.value.length = notover  //未交
        }

    });
   
    global.bus.emit('key',                          //未交个数
        {
            key:'home',
            message: '你有' + notover + '条作业没交',
            path: '/student/myHomework'
        }
    )
}

</script>
<style>
.file .el-tag--large {
    margin-bottom: 0.35rem
}
</style>
