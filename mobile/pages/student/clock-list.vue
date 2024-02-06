<template>

	<view>
	<ClassSelector></ClassSelector>

		<uni-list-chat v-for="(item,index) in tableData" :key="index" :title="item.name"
			avatar="https://img.36krcdn.com/20200410/v2_6905947498bc4ec0af228afed409f771_img_png?x-oss-process=image/resize,m_mfit,w_520,h_300/crop,w_520,h_300,g_center"
			:note="item.createTime"  :time="item.state" 
			 badge-positon="left"
			
			 >
		</uni-list-chat>

	</view>
</template>

<script setup>
	import useGlobal from '@/utils/useGlobal.js'
	import {
		ref,
		onMounted,
		reactive,
		onUnmounted
	} from 'vue'
	import ClassSelector from "../../components/ClassSelector.vue"
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app'
	const global = useGlobal()
	let tableData = ref()

	onShow(() => {
		getclock()
		global.bus.on('change', getclock)
	})
	 
	//获取打卡列表
	async function getclock() {
		tableData.value = await global.axios.get('/student/getclock', {
			params: {
				userid: global.data.me.id,
				classid: global.data.currentClassId,
				schoolId: global.data.me.schoolId
			}
		})
	 
		tableData.value.forEach(element => {

			//转换时间格式
			element.createTime = new Date(element.createTime).toLocaleString()

		});
	}
</script>
