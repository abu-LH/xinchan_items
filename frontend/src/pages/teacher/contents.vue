<template>
  <div>
  <div style="width: 530px;margin:0 auto;">
    <el-card class="box-card" style="width: 530px">
      <template #header>

      </template>
      <div class="row">
        <span>课程名称:</span
        ><el-input style="width: 400px" v-model="input" placeholder="请输入课次" />
      </div>
      <div class="row">
        <span>开始时间:</span>
        <el-date-picker
          v-model="input1"
          type="datetime"
          placeholder="请输入时间"
          style="width: 400px"
        />
      </div>
      <div class="row">
        <span>结束时间:</span>
        <el-date-picker
          v-model="input2"
          type="datetime"
          placeholder="请输入时间"
          style="width: 400px"
        />
      </div>
      <el-button type="primary" style="margin-top:30px;" @click="add">确认添加</el-button>
    </el-card>
  </div>
</div>
</template>
      
<script  setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import useGlobal from "../../utils/useGlobal";
import FileUpload from "../../components/FileUpload.vue";
import FileList from "../../components/FileList.vue";
const input = ref("");
const input1 = ref("");
const input2 = ref("");
const global = useGlobal();

global.bus.off("classChange");

global.bus.on("classChange", (index) => {
  global.router.push("class");
});




async function add() {
  let data=await global.axios.post("/teacher/selctshool",{id:global.data.currentClassId})//global.data.me.id,global.data.currentClassId
			  
			  let startTime= new Date(input1.value).toLocaleString().replace(/[\u4e00-\u9fa5]/g," ").replaceAll("/", "-")
			  let endTime=new Date(input2.value).toLocaleString().replace(/[\u4e00-\u9fa5]/g," ").replaceAll("/", "-")
			  let createTime=new Date(new Date()).toLocaleString().replace(/[\u4e00-\u9fa5]/g," ").replaceAll("/", "-")
			  let updateTime=new Date(new Date()).toLocaleString().replace(/[\u4e00-\u9fa5]/g," ").replaceAll("/", "-")
			  
			  let data1=await global.axios.post("/teacher/addclass",{
				  arr:[data[0].schoolId,data[0].courseId,0,global.data.currentClassId,global.data.me.id,input.value,startTime,endTime,createTime,updateTime]
			  })
        if(data1.affectedRows>0){
          ElMessage({
          message: "添加成功",
          type: "success",
      });
        }
    global.bus.emit("updata")
}



</script>
    
      <style scoped>
.card-header {
  display: flex;
  justify-content: center;
  align-items: center;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.el-alert {
  margin: 20px 0 0;
}
.el-alert:first-child {
  margin: 0;
}
</style>
      