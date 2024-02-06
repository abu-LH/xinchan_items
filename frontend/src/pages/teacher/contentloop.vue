<template>
    <div> 
      <span style="color:black;font-size:20px;">课程查看</span>
        <el-table :data="tableData.arr" border empty-text="没有啦">
          <el-table-column fixed prop="startTime" label="开始时间"  :formatter="formatData" width="auto" />
          <el-table-column fixed prop="endTime" label="结束时间"  :formatter="formatData" width="auto" />
          <el-table-column prop="name" label="课程内容" width="auto" />
          <el-table-column prop="coursewareFiles" label="课件">
          <template #default="scope">
            <FileList v-model="scope.row.coursewareFiles" readonly></FileList>
          </template>
        </el-table-column>
        <el-table-column prop="homeworkFiles" label="作业">
          <template #default="scope">
            <FileList v-model="scope.row.homeworkFiles" readonly></FileList>
          </template>
        </el-table-column>
          <el-table-column fixed="right" label="查看" width="auto">
            <template  #default="scope">
              <el-button link type="primary" size="small"  @click="handleClick(scope.$index,scope.row)"
                >查看课次</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
    </template>
    
    <script  setup>
  
  import useGlobal from '../../utils/useGlobal'
  import { reactive,ref } from 'vue';
  import FileList from '@/components/FileList.vue'

 

    const global=useGlobal()


    const input1 = ref()
    const input2 = ref()
    const input3 = ref()
    const tableData = reactive({
      arr:[],
    })
    global.bus.off('classChange') 


    global.bus.on('classChange',index=>{

      onload()

    }) 

    function formatData(row, column, cellValue, index) {

        var s = new Date(cellValue).toLocaleString();
        return s;

    }

    
    //加载页面时加载的数据
   
  async  function onload(){
    let data=await global.axios.post("/teacher/content",{id:global.data.currentClassId,id1:global.data.me.id})
      tableData.arr=data
    } 

    onload()

    
  
    //查看
    const handleClick = (i,con) => {
      global.$router.push({
        // 路由传参
        name: 'class',
        query: {
            id:tableData.arr[0].id,
        }
    })
    }
   
    </script>

    <style scoped>

      .add{
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 950px;
        position: absolute;
        top: 35%;
        left: 20%;

      }
      .add1{
        width: 100px;
      }

    </style>
    