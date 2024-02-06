<template>
  
  <el-tabs class="demo-tabs"  >

    <el-table @row-click="handleClick" :data="tableData">
     <el-table-column prop="updateTime" label="时间"  sortable />
      <el-table-column prop="username" label="教师" /> 
      <el-table-column prop="name" label="科目" />
    </el-table>
     
  </el-tabs>
  
  
</template>
<script  setup>

import useGlobal from '@/utils/useGlobal.js'    //引入 全局总线
import { ref, onMounted,   onBeforeUpdate,onUnmounted} from 'vue'
 
const global = useGlobal()                       // 全局总线
let tableData = ref()
 

 // 页面跳转到 classtime
const handleClick = (classtime) => {
 
  global.router.push({name:'classtime',
  query:{
      id:classtime.id   //传参id
      }
}) 
  
}
 
 
//页面加载前调用
onMounted(() => {
    query()
    global.bus.on('classChange', query)
})
onUnmounted(()=>{
    global.bus.off('classChange', query)

})
 
    //获取课程数据
     let query= async()=>{
       
      tableData.value=  await global.axios.get('/student/classtimes', {
        params:{
           classid:global.data.currentClassId,  //传参班级id  
           schoolId:global.data.me.schoolId    
        }
    }) 
    // console.log(global.data.currentClassId);

    tableData.value.forEach(element => {

         //转换时间格式
          let time = new Date(element.updateTime).toLocaleString();
          //  console.log(time);

         element.updateTime=time
 
        });

        }
 
  
</script>
 
 
 