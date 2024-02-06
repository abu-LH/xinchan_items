<template>
	<view>
		<uni-section  title="所有课次" type="line" style="height: 400rpx;overflow: auto;">
			<view class="border" v-for="(item,index) in tableData.arr">
				<text>{{item.name}}</text>
				<view>
					<button type="primary" style="margin-right:auto;font-size:5rpx;height: 50rpx;width: 60px;line-height: 50rpx;" @click="dele(index)">删除</button>
				</view>
			</view>		
		</uni-section>
		<uni-section title="添加课次"  type="line" padding>
			<uni-easyinput class="uni-mt-5" trim="all" v-model="value1" placeholder="请输入课次名"></uni-easyinput>
							<uni-section :title="'开始时间'" type="line"></uni-section>
					<view class="example-body">
						<uni-datetime-picker v-model="single1"/>
					</view>
					<uni-section :title="'结束时间'" type="line"></uni-section>
					<view class="example-body">
						<uni-datetime-picker v-model="single2" />
					</view>
			<button type="primary" style="margin-top:30rpx;;font-size:5rpx;width: 120px;" @click="add">添加</button>
		</uni-section>
		
	</view>
	
</template>

<script setup>
	
	import { ref, reactive ,onMounted} from "vue";
	import useGlobal from "../../utils/useGlobal";
	
	const global=useGlobal()
	
   const tableData = reactive({
      arr:[],
    })
	const value1=ref()
	const single2=ref()
	const single1=ref()
	
	onMounted(() => {
		onload()
		global.bus.on('change',onload)
		
	
	});
	
	async  function onload(){
	  let data=await global.axios.post("/teacher/Class",{id:global.data.currentClassId,id1:global.data.me.id})
	    tableData.arr=data
	    console.log(data)
	  } 
	
	  onload()
	  
	 async function dele(i){
			uni.$emit('update')
		  let name=tableData.arr[i].name
		  let data=await global.axios.post("/teacher/deletclass",{name:name})//global.data.me.id,global.data.currentClassId
			onload()
	  }
	  async function add(i){
	  		  uni.$emit('update')
			  let data=await global.axios.post("/teacher/selctshool",{id:global.data.currentClassId})//global.data.me.id,global.data.currentClassId
			  
			  let startTime= new Date(single1.value).toLocaleString().replace(/[\u4e00-\u9fa5]/g," ").replaceAll("/", "-")
			  let endTime=new Date(single2.value).toLocaleString().replace(/[\u4e00-\u9fa5]/g," ").replaceAll("/", "-")
			  let createTime=new Date(new Date()).toLocaleString().replace(/[\u4e00-\u9fa5]/g," ").replaceAll("/", "-")
			  let updateTime=new Date(new Date()).toLocaleString().replace(/[\u4e00-\u9fa5]/g," ").replaceAll("/", "-")
			  
			  let data1=await global.axios.post("/teacher/addclass",{
				  arr:[data[0].schoolId,data[0].courseId,0,global.data.currentClassId,global.data.me.id,value1.value,startTime,endTime,createTime,updateTime]
			  })
			onload()
	   }
	
</script>

<style scoped>
	.border{
		border-bottom:1rpx solid silver;
		padding: 10rpx;
		margin-top:10rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
</style>