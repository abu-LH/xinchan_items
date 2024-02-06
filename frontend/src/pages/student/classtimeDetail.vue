<template>
    
        <el-descriptions :column="1" border>
            <el-descriptions-item
                label="课次名称"
                label-align="right"
                align="center"
                label-class-name="my-label"
                class-name="my-content"
                size="large"
                class="des-item"
                >{{ courseTitle }}</el-descriptions-item
            >
            <el-descriptions-item label="课次时间" class="des-item" label-align="right" align="center"
                >{{ courseDuration }}</el-descriptions-item
            >
            <el-descriptions-item label="课件列表" label-align="right" class="des-item" align="center">
                <FileList v-model="coursewareList" readonly></FileList>
            </el-descriptions-item>
            <el-descriptions-item label="作业列表" label-align="right" class="des-item" align="center">
                <FileList v-model="homeworkList" readonly></FileList>
            </el-descriptions-item>
        
        </el-descriptions>
        
    
</template>
<script setup>
    import useGlobal from '@/utils/useGlobal.js'
    import { ref,onBeforeMount, onMounted,onUnmounted } from 'vue'
    import FileList  from '../../components/FileList.vue';
    const courseTitle = ref('')
    const courseDuration = ref('')
    const coursewareList = ref()
    const homeworkList = ref( )
    const tableData = ref()
    
    const global = useGlobal()

 onMounted(() => {
    query()
    global.bus.on('classChange', function skips(){
        global.router.push({
            name:'students'
        })
    })
  
})

onUnmounted(()=>{ 
     
    global.bus.off('classChange', query)
    

})   
 
   //获取课程详情
    let query= async()=>{
      let params = global.router.currentRoute.value.query   //获取路由参数
        console.log(params.id);
        tableData.value=await global.axios.get('/student/classtime',{
        params:{
            id:params.id, 
            classId:global.data.currentClassId  
        }
        }) 
        console.log(tableData.value)
         if(tableData.value=='')return
        tableData.value.forEach(element => {
        
            courseTitle.value = element.name
           //转换日期格式
            courseDuration.value =new Date(element.startTime).toLocaleString(); 
          
             
            coursewareList.value = element.coursewareFiles
            homeworkList.value = element.homeworkFiles
           
        })
        
     
    }
 
</script>

<style scoped>
 
    .el-tag {
        margin:0 .5rem;
    }
    
</style>