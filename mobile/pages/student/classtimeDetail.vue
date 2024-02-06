<template>
	<view >
			<uni-section class="mb-10" title="课次名称">
				<template v-slot:right  >
					{{tableData.name}}
				</template>
			</uni-section>
			<uni-section class="mb-10" title="课次时间">
				<template v-slot:right>
					{{tableData.updateTime}} 
				</template>
			</uni-section>
			<uni-section class="mb-10" title="课件列表">
				<template v-slot:right>
			<FileList v-model="tableData.coursewareFiles" readonly></FileList>	 
					 
				</template>
			</uni-section>
			<uni-section class="mb-10" title="作业列表">
				<template v-slot:right>
					<FileList v-model="tableData.homeworkFiles" readonly></FileList>	 
					 
				</template>
			</uni-section>
	</view>

</template>
<script setup>
	import useGlobal from '@/utils/useGlobal.js'
	import {
		ref,
		onBeforeMount,
		reactive,

	} from 'vue'
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app'
	import FileList  from '../../components/FileList.vue';
	const tableData = reactive({
			classId: '',
			contentId: '',
			courseId: '',
			coursewareFiles: '',
			createTime: '',
			endTime: '',
			homeworkFiles: '',
			id: '',
			name: '',
			schoolId: '',
			startTime: '',
			updateTime: '',
	})
   
	const global = useGlobal()
	let ChangGuan=reactive()
	onShow(() => {
		query()
	})
    onLoad((e)=>{
		 ChangGuan = e.id
		 console.log("changguan:" + ChangGuan)
	})

	//    //获取课程详情
	let query = async () => {

		let data = await global.axios.get('/student/classtime', {
			params: {
				id:ChangGuan,
				classId:global.data.currentClassId
			}
		})
		// console.log(global.data.currentClassId)	
		data.forEach((item)=>{
			console.log(item.name)
			
			         //转换时间格式
			item.updateTime=new Date(item.updateTime).toLocaleString()
			
			tableData.name=item.name
			tableData.updateTime=item.updateTime
			tableData.coursewareFiles=item.coursewareFiles
			tableData.homeworkFiles=item.homeworkFiles
		})
		 
		
		 

	}
</script>

<style scoped lang="scss">
	:deep(.uni-section-header__content)  {
		flex-basis: 200rpx !important;
	}
</style>
