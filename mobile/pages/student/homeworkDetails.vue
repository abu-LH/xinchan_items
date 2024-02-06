<template>
    <view class="homeworkDetail">
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
		<uni-section class="upload" title="作业上传" >
			<FileList ref="fileList" v-model="files"></FileList>
			<FileUpload @success="onFileUpload" class="upload-btn" title="选择上传文件"></FileUpload>
		</uni-section>
		<uni-forms-item label="备注">
			<uni-easyinput 
			type="textarea"
			 v-model="tableData.remark"
			 :disabled="status"
			 auto-blur
			 />
		</uni-forms-item>
		<uni-forms-item readonly v-show="tableData.comment!=null" label="评语">
			<uni-easyinput type="textarea" v-model="tableData.comment" disabled/>
		</uni-forms-item>
		<button type="primary" class="homework-btn" @click="onSubmit() ">提交</button>	
		<view>
			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
    </view>
    	<tab-bar pagePath="/pages/student/homeworkDetails"></tab-bar>
</template>
<script setup >
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
    import FileList from '../../components/FileList.vue'
    import FileUpload from '../../components/FileUpload.vue'

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
		remark: '',
		comment: null,
		classtimeId: '',
   })
   let status = ref(false)
   const global = useGlobal()
   let ChangGuan=reactive()
   const message = ref(null)
   // message.value.open()
	const fileList = ref(null)
    const files = ref('')
	
   onShow(() => {
   	query()
   })
   onLoad((e)=>{
   	 ChangGuan = e.id
   	 console.log("changguan:" + ChangGuan)
   })
   
   //    //获取课程详情
   let query = async () => {
   
   	let data = await global.axios.get('/student/homework', {
   		params: {
   			id:ChangGuan,
			userid:global.data.me.id,
   			classId:global.data.currentClassId
   		}
   	})
		
	console.log(data);
   	data.forEach((item)=>{
   		
   		         //转换时间格式
   		item.updateTime=new Date(item.updateTime).toLocaleString()
   		
   		tableData.name=item.name
   		tableData.updateTime=item.updateTime
   		tableData.coursewareFiles=item.coursewareFiles
   		tableData.homeworkFiles=item.homeworkFiles
		tableData.classtimeId=item.classtimeId
		tableData.remark = item.remark
		tableData.comment = item.review
		console.log(tableData.comment)
   	}) 
	
   }

   const onFileUpload = (file) => {
        fileList.value.addFile(file)
    }
      
	//提交成功显示框
	let type= 'center'
	let msgType= 'success'
	let messageText= '提交成功'
	let value= ''
    
	function messageToggle() {
					msgType = 'success'
					message.value.open()
				}
	  
    let  onSubmit= async()=>{
        status.value = true
  
        await global.axios.post('/student/joinHomeworks', {      
            studentId:   global.data.me.id ,
            files:      tableData.coursewareFiles,
            remark:      tableData.remark,  
            classtimeId: tableData.classtimeId ,	
        })
		messageToggle()
		function change() {
			uni.navigateTo({
				url:'myHomework'
			})
		}
		setTimeout(change,800)
        ;        
    }
 
</script>

<style scoped>
	.homeworkDetail {
		background-color: #fff;
	}
	.upload-btn {
		margin: 20rpx auto;
		width: 260rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 8px;
	}
	.homework-btn {
		width: 50%;
	}
	.uni-forms-item {
		padding: 0 10px;
	}
	:deep(.is-disabled) {
		color: black !important;
		background-color: #fff !important;
	}
	:deep(.uni-section-header__content)  {
		flex-basis: 200rpx !important;
	}
</style>
