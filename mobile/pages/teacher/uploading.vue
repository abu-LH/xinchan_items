<template>
	<view>

	    <FileUpload
		        title="上传课件"
		        @success="fn"
		        style="margin-top: 10px;font-size: 10rpx;width: 300rpx;"
		      ></FileUpload>
			  	<uni-group title="课件" margin-top="20">
						<template v-for="item in tableData.arr">
							<FileList v-model="item.coursewareFiles"  @update:modelValue="delFile"></FileList>
						</template>
			  	</uni-group>

		
		      <FileUpload
		        title="上传作业"
		        @success="fn1"
		        style="margin-top: 10px;font-size: 10rpx;width: 300rpx;"
		      ></FileUpload>
			  <uni-group title="作业" margin-top="20">
		          <template v-for="item in tableData.arr">
		            <FileList  v-model="item.homeworkFiles" @update:modelValue="delFile1"></FileList>
		          </template>
			</uni-group>
	</view>
</template>

<script setup>
	import FileUpload from "../../components/FileUpload.vue";
	import FileList from "../../components/FileList.vue";
	 import { reactive, ref, onMounted} from 'vue';
	  import useGlobal from '../../utils/useGlobal'
	const tableData = reactive({
	  arr: [],
	});
	const global=useGlobal()
	async function fn(value) {
	  let content;
	  uni.getStorage({
	  	key: '课程名称',
	  	success: function (res) {
	  		content=res.data.name
	  	}
	  });
	
	  let data = await global.axios.post("/teacher/clickClass", {
	    name: content,
	  });
	  let data1 = data[0].coursewareFiles
	  let str="|"
	  if(!data1 || data1=="(NULL)"){
	    str=""
	  }
	  let coent1 = global.axios.post("/teacher/Courseware", {
	    Courseware: data1+str+value,
	    name: content,
	  });
	  onlad();
	}
	
	async function fn1(value) {
	  let content;
	  uni.getStorage({
	  	key: '课程名称',
	  	success: function (res) {
	  		content=res.data.name
	  	}
	  });
	
	  let data = await global.axios.post("/teacher/clickClass", {
	    name: content,
	  });
	  console.log(data)
	  let data1 = data[0].homeworkFiles
  let str="|"
  if(!data1 || data1=="(NULL)"){
    str=""
  }
	  let coent1 = global.axios.post("/teacher/Homework", {
	    Courseware:data1+str+value,
	    name: content,
	  });
	  onlad();
	}
	
	
	onlad();
	
	async function onlad() {
	  let content;
	  uni.getStorage({
	  	key: '课程名称',
	  	success: function (res) {
			content=res.data.name
	  	}
	  });
	  let data1 = await global.axios.post("/teacher/clickClass", {
	    name: content,
	  });
	  tableData.arr=data1
	}
		
async function delFile(content){
		let content1;
		uni.getStorage({
			key: '课程名称',
			success: function (res) {
					content1=res.data.name
			}
		});
		console.log("11111111")
		let data1 = await global.axios.post("/teacher/Courseware", {
		  Courseware:content,		
		  name: content1,
		});
		console.log("11111111")
		onlad()
	}
async function delFile1(content){
		let content1;
		uni.getStorage({
			key: '课程名称',
			success: function (res) {
					content1=res.data.name
			}
		});

		let data1 = await global.axios.post("/teacher/Homework", {
		  Courseware:content,		
		  name: content1,
		});
		console.log("11111111")
		onlad()
	}
</script>

<style>
</style>