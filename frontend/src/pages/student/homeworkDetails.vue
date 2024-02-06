<template>
    
  <el-form  label-width="120px">
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
            >{{ courseDuration }}~~{{updateTime }}</el-descriptions-item
        >
        <el-descriptions-item label="课件列表" label-align="right" class="des-item" align="center">
            <FileList v-model="coursewareList" readonly></FileList>
        </el-descriptions-item>
        <el-descriptions-item label="作业列表" label-align="right" class="des-item" align="center">
            <FileList v-model="homeworkList" readonly></FileList>
        </el-descriptions-item>
    
    </el-descriptions>

    <el-form-item label="上传作业" >
        <FileList ref="fileList" v-model="files"></FileList>
        <FileUpload @success="onFileUpload"></FileUpload>
    </el-form-item>
    <el-form-item label="备注">
        <el-input 
        :readonly="status" 
        v-model="remark" 
        rows="3" 
        resize="none" 
        type="textarea" 
        />
    </el-form-item>
    <el-form-item 
        label="批改评语"
        v-show="comment!=null"
     >
                <el-input 
                v-model="comment" 
                type="textarea" 
                rows="3" 
                resize="none" 
                readonly 
                />
    </el-form-item>
   <el-button  type="primary" size="large"  @click="onSubmit()" auto-insert-space>
               提交
            </el-button>
        
  </el-form>
    
</template>
<script setup >
    import useGlobal from '@/utils/useGlobal.js'    
    import { ref,onMounted, reactive,onUpdated ,onUnmounted } from 'vue'
    import { ElMessage } from 'element-plus'
    import FileList from '../../components/FileList.vue'
    import FileUpload from '../../components/FileUpload.vue'

    //设置变量
    const courseTitle = ref('')
    const courseDuration = ref('')
    const updateTime = ref('')
    const coursewareList = ref('')
    const homeworkList = ref('')
    const fileList = ref(null)
    const files = ref('')
    const remark = ref('')
    const comment = ref('')
    const tableData = ref()
    let status = ref(false)

    const global = useGlobal()
    onMounted(() => {
        query()
        global.bus.on('classChange',function(){
             global.router.push({name:'myHomework'})
        })
    })
  
    onUnmounted(()=>{
        global.bus.off('classChange', query)
    })
    
    let query= async()=>{
       let reslest= global.router.currentRoute.value.query
        // console.log('aa----'+global.data.currentClassId)
        // 获取课次，课次时间
        tableData.value= await global.axios.get('/student/homework', {
        params:{
            id:reslest.id,
            userid:global.data.me.id,
            classId:global.data.currentClassId
        }
        }) 
        console.log(tableData.value)
        if(tableData.value){
        tableData.value.forEach(element => {
            courseTitle.value = element.name
            //转换时间格式
           
            courseDuration.value = new Date(element.startTime).toLocaleString();;  //转换日期格式
            updateTime.value = new Date(element.updateTime).toLocaleString();;  //转换日期格式
            coursewareList.value = element.coursewareFiles
            homeworkList.value = element.homeworkFiles
            files.value = element.files
            comment.value = element.review
            remark.value = element.remark
        })
      }else{
        courseTitle.value=''
      }
        console.log( courseTitle.value);
    
    }

    const onFileUpload = (file) => {
        fileList.value.addFile(file)
    }
      
    let  onSubmit= async()=>{
        status.value = true
        //   let  date=toRefs(tableData.value)
        //  console.log('阿萨·'+tableData.value[0].classtimeId);    
        await global.axios.post('/student/joinHomeworks', {
              
            studentId:   global.data.me.id ,
            files:      files.value,
            remark:      remark.value,  
            classtimeId: tableData.value[0].classtimeId 
        }
        
        )

        ElMessage.info('提交成功')
        global.router.push({
            name:'myHomework'
        })

        
     
    }
 
</script>

<style scoped>
   
    .el-tag {
        margin:0 .5rem
    }
    .upload-demo{
        width: 100%;
        margin-top: 1rem;
    }
    .el-textarea {
        --el-input-focus-border-color:#dcdfe6;
        --el-input-hover-border-color:#dcdfe6;
    }
    
</style>
<style lang="scss">
    .el-form-item .el-upload > .el-button {
        margin-bottom: 0.4rem;
        margin-left: 0.75rem;
    }
    .el-form-item > .el-form-item__content .file{
        margin-top: 0.5rem ;
        margin-bottom: 0.5rem ;
    }
    .el-form-item {
        .el-form-item__content {
            .file {
                .close {
                    display: none;
                }
            }
        }
    }
    .el-form-item {
        .el-form-item__content {
            .file:hover {
                .close {
                    display: inline-block;
                }
            } 
        }
    }
</style>