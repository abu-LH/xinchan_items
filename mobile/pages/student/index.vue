<template>
	<view>
		<classselector></classselector>
		
			<uni-list-chat v-for="(item,index) in tableData" :key="index"               :title="item.name"
			avatar="https://img.36krcdn.com/20200411/v2_f497b1c414d5489791569b3ea99df33d_img_000"
			class='range'
			:note="item.username" :time="item.updateTime" 
			badge-positon="left"  @click="goDetailsArena(item.id)"  link  >	
		</uni-list-chat> 
 
	</view>
	<tab-bar pagePath="/pages/student/index"></tab-bar>
</template>

<script setup>
	import useGlobal from '@/utils/useGlobal.js' //引入 全局总线
	import classselector from "../../components/ClassSelector.vue"
	import {
		ref,
		onMounted,
		onBeforeUpdate,
		onUnmounted,
		onUpdated,
		watch
	} from 'vue'
    const global = useGlobal();
    let uniapp=ref('uni-apps')
	let tableData = ref()
	let now=Date.now()
	
// 页面跳转到 classtime
	function goDetailsArena(id) {
		
		uni.navigateTo({
			url:'classtimeDetail?id='+id

		});
	}
		//页面加载前调用
	onMounted(()=>{
		 query()
		 global.bus.on('change',query)
		  
	})
   
	//获取后端数据
	async function query(){
         
		tableData.value = await global.axios.get('/student/classtimes', {
			params: {
				classid:global.data.currentClassId, //传参班级id 
					  schoolId:global.data.me.schoolId    
			}
		})	
		// console.log(global.data.currentClassId)
		// console.log(tableData.value);

		tableData.value.forEach(element => {

		         //转换时间格式
	    element.updateTime=new Date(element.updateTime).toLocaleString()
	    // console.log( element.updateTime)
		 
		});

	}
</script>

<style  scoped>
     .range{
		 margin: 10rpx auto;
	 }
</style>
