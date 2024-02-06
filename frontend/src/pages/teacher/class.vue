<template>
    <div> 
      <el-button type="primary" style="display: block;" @click="drawer = true">
        新增课次+
    </el-button>
    <el-drawer v-model="drawer" title="I am the title" :with-header="false" size="50%">
      <Contents></Contents>
    </el-drawer>
      <span style="color:black;font-size:20px;">课次查看</span>
        <el-table :data="tableData.arr" border empty-text="没有啦">
          <el-table-column fixed prop="startTime" label="开始时间"  :formatter="formatData" width="auto" />
          <el-table-column fixed prop="endTime" label="结束时间"  :formatter="formatData" width="auto" />
          <el-table-column prop="name" label="课次内容" width="auto" />
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
          <el-table-column fixed="right" label="增/删" width="auto">
            <template  #default="scope">
              <el-button link type="primary" size="small"  @click="handleClick(scope.$index,scope.row)"
                >编辑</el-button>
                <el-button link type="primary" size="small"  @click="handleClick1(scope.$index,scope.row)"
                >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>
    </template>
    
    <script  setup>
  
  import useGlobal from '../../utils/useGlobal'
  import { reactive,ref } from 'vue';
  import FileList from '@/components/FileList.vue'
  import Contents from "./contents.vue"

 

    const global=useGlobal()


    const input1 = ref()
    const input2 = ref()
    const input3 = ref()
    const drawer = ref(false)
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
    let data=await global.axios.post("/teacher/Class",{id:global.data.currentClassId,id1:global.data.me.id})
      tableData.arr=data
      console.log(data)
    } 

    onload()

    global.bus.on("updata",()=>{
      onload()
    })
  
    //查看
    const handleClick = (i,con) => {
      global.$router.push("DetailsCourse")
      window.localStorage.setItem("1",JSON.stringify(con))

    }
    //增删
    async function handleClick1(index,content){
  let data=await global.axios.post("/teacher/deletclass",{name:content.name})
			onload()
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
    