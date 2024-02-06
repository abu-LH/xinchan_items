<template>
  <div style="width: 600px; margin: 0 auto">
    <el-card class="box-card" style="width: 600px">
      <template #header>
        <div class="card-header">
          <router-link to="/teacher/class" replace>返回</router-link>
        </div>
      </template>
      <div class="row">
        <span>课程名称</span
        ><el-input style="width: 400px" v-model="input" /><el-button
          type="primary"
          @click="update"
          plain
          >修改</el-button
        >
      </div>
      <div class="row">
        <span>开始时间</span>
        <el-date-picker
          v-model="input1"
          type="datetime"
          placeholder="Select date and time"
          style="width: 400px"
        /><el-button type="primary" @click="update" plain>修改</el-button>
      </div>
      <div class="row">
        <span>结束时间</span>
        <el-date-picker
          v-model="input2"
          type="datetime"
          placeholder="Select date and time"
          style="width: 400px"
        /><el-button type="primary" @click="update" plain>修改</el-button>
      </div>
      <FileUpload
        title="上传课件"
        @success="fn"
        style="margin-top: 10px"
      ></FileUpload>
      <el-table :data="tableData.arr" empty-text="没有啦">
        <el-table-column prop="coursewareFiles" label="课件">
          <template #default="scope">
            <FileList v-model="scope.row.coursewareFiles" @update:modelValue="delFile"></FileList>
          </template>
        </el-table-column>
      </el-table>
      <FileUpload
        title="上传作业"
        @success="fn1"
        style="margin-top: 10px"
      ></FileUpload>
      <el-table :data="tableData.arr" empty-text="没有啦">
        <el-table-column prop="homeworkFiles" label="作业">
          <template #default="scope">
            <FileList v-model="scope.row.homeworkFiles" @update:modelValue="delFile1" ></FileList>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
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
const tableData = reactive({
  arr: [],
});
global.bus.off("classChange");

global.bus.on("classChange", (index) => {
  global.router.push("class");
});

async function fn(value) {
  console.log(value)
  let content1 = localStorage.getItem("1");
  let content = JSON.parse(content1);
  let data = await global.axios.post("/teacher/clickClass", {
    name: content.name,
  });
  let data1 = data[0].coursewareFiles
  let str="|"
  if(!data1 || data1=="(NULL)"){
    str=""
  }
  let content2=data1+str+value
  let coent1 = global.axios.post("/teacher/Courseware", {
    Courseware:content2,
    name: content.name,
  });
  onlad();
}



async function fn1(value) {
  let content1 = localStorage.getItem("1");
  let content = JSON.parse(content1);
  let data = await global.axios.post("/teacher/clickClass", {
    name: content.name,
  });
  let data1 = data[0].homeworkFiles
  let str="|"
  if(!data1 || data1=="(NULL)"){
    str=""
  }
  let content2=data1+str+value
  let coent1 = global.axios.post("/teacher/Homework", {
    Courseware:content2,
    name: content.name,
  });
  onlad();
}

onlad();

async function onlad() {
  let content1 = localStorage.getItem("1");
  let content = JSON.parse(content1);
  input.value = content.name;
  input1.value = content.startTime;
  input2.value = content.endTime;
  let data1 = await global.axios.post("/teacher/clickClass", {
    name: content.name,
  });
  tableData.arr=data1
  console.log(data1);
}

async function update() {
  let content1 = localStorage.getItem("1");
  let content = JSON.parse(content1);
  let data = await global.axios.post("/teacher/theSame", {
    startTime: new Date(input1.value).toLocaleString().replaceAll("/", "-"),
    endTime: new Date(input2.value).toLocaleString().replaceAll("/", "-"),
  });
  if (data.length > 1) {
    ElMessage.error("时间冲突,修改失败");
  } else {
    let data = await global.axios.post("/teacher/classupdat", {
      name: input.value,
      createTime: new Date(input1.value).toLocaleString(),
      updateTime: new Date(input2.value).toLocaleString(),
      id: content.id,
    });
    if (data.affectedRows > 0) {
      ElMessage({
        message: "修改成功",
        type: "success",
      });
    } else {
      ElMessage.error("修改失败");
    }
  }
}
//删除事件
async function delFile1(content){
  let content3 = localStorage.getItem("1");
  let content2 = JSON.parse(content3);
  let content1 = content2.name;

		let data1 = await global.axios.post("/teacher/Homework", {
		  Courseware:content,		
		  name: content1,
		});
		onlad()
	}
  async function delFile(content){
    let content3 = localStorage.getItem("1");
  let content2 = JSON.parse(content3);
  let content1 = content2.name;
		let data1 = await global.axios.post("/teacher/Courseware", {
		  Courseware:content,		
		  name: content1,
		});
		onlad()
	}
</script>
    
      <style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
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
      