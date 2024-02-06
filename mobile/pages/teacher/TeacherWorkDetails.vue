<template>
	<view>
		<uni-section class="mb-10" title="课次名称:" type="line">
			<template v-slot:right>
				{{coursewareMessage.name}}
			</template>
		</uni-section>
		<uni-section class="mb-10" title="课次时间:" type="line">
			<template v-slot:right>
				{{coursewareMessage.startTime}}
			</template>
		</uni-section>
		<uni-section class="mb-10 list" title="课件列表:" type="line">
			<template v-slot:right>
				<view class="filelist">
					<FileList v-model="coursewareMessage.coursewareFiles" readonly></FileList>
				</view>

			</template>
		</uni-section>
		<uni-section class="mb-10" title="作业列表:" type="line">
			<template v-slot:right>
				<view class="filelist">
					<FileList v-model="coursewareMessage.homeworkFiles" readonly></FileList>
				</view>

			</template>
		</uni-section>
	</view>
	<uni-section title="作业提交列表" type="line" padding style="backgroundColor:#fafafa">
		<uni-section class="mb-10" :title="item.name" v-for="item in jobSubmissionList">
			<template v-slot:right>
				<FileList v-model="item.files" readonly></FileList>
			</template>
		</uni-section>

	</uni-section>
	<view class="content">
		<uni-section title="学生备注" type="line" padding style="backgroundColor:#fafafa">
			<textarea class="textarea" :value="remark" disabled></textarea>
		</uni-section>

		<uni-section title="评语" type="line" padding style="backgroundColor:#fafafa">
			<textarea class="textarea" v-model="txt"></textarea>
		</uni-section>

	</view>
	<view class="submit">
		<button type="primary" @click="submitReview">提交</button>
		<view>
			<!-- 提示信息弹窗 -->
			<uni-popup ref="message" type="message">
				<uni-popup-message :type="msgType" :message="messageText" :duration="2000"></uni-popup-message>
			</uni-popup>
		</view>
	</view>

</template>
<script setup>
import {
	onMounted,
	reactive,
	ref
} from 'vue'
import {
	onLoad
} from '@dcloudio/uni-app'
import useGlobal from '../../utils/useGlobal.js'
import FileList from '../../components/FileList.vue'

const global = useGlobal()
const message = ref(null)

// --- 接受路由传参---
onLoad((option) => {
	console.log(option.hwId, option.stuId);
	hwId.value = option.hwId
	stuId.value = option.stuId
})
let hwId = ref('')
let stuId = ref('')

// ------获取当前展示的课件信息-----------
let coursewareMessage = reactive({
	name: '',
	startTime: '',
	coursewareFiles: '',
	homeworkFiles: '',
})
async function getCourseList(homeworkId) {
	console.log('@@@@@@@', homeworkId);
	let result = await global.axios.get('/teacher/classtimes', {
		params: {
			id: homeworkId
		}
	})
	console.log('getCourseList', result);
	if (result.length >= 1) {
		coursewareMessage.name = result[0].name
		coursewareMessage.startTime = new Date(result[0].startTime).toLocaleString().replace(/[\u4e00-\u9fa5]/g,
			" ").replaceAll("/", "-")
		coursewareMessage.coursewareFiles = result[0].coursewareFiles
		coursewareMessage.homeworkFiles = result[0].homeworkFiles



		homeWorkSubmissionList(result[0].studentId)
	}

}
onMounted(() => {
	getCourseList(hwId.value)
})


// ---------作业提交列表----------
const jobSubmissionList = reactive([])

async function homeWorkSubmissionList(stuId) {

	let result = await global.axios.get('/teacher/studenthomeworklist', {
		params: {
			id: stuId
		}
	})
	console.log('homeWorkSubmissionList', result);

	result.forEach(item => {
		if (item.files) {
			jobSubmissionList.push(item)
			//备注信息
			remark.value = item.remark
		}

	})
}


//------------------提交评语---------------
let txt = ref('')
let remark = ref('') //备注信息

async function submitReview() {
	if (txt.value == '') return
	let id = stuId.value
	let rusult = await global.axios.post('/teacher/submitreview', {
		val: [txt.value, id]
	})
	messageToggle()
	txt.value = ''
}


//----提交成功显示框-------
let msgType = 'success'
let messageText = '提交成功'

function messageToggle() {
	msgType = 'success'
	message.value.open()
}

</script>
<style lang="scss" scoped>
.textarea {
	width: 95%;
	border: solid 1px #000;
	border-radius: 5px;
	margin: auto;
}

button {

	width: 86%;
}

:deep(.uni-section-header__content) {
	flex-basis: 300rpx !important;
}
</style>
