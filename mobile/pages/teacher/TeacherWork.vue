<template>
	<!-- <classselector></classselector> -->
	<view>
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
			activeColor="#007aff"></uni-segmented-control>
		<view class="content">
			<view v-show="current === 0">
				<view class='select'>
					<uni-data-select v-model="selectValue" :localdata="range"  :clear="false">
					</uni-data-select>
				</view>
				<uni-list>
					<uni-list-item showArrow v-for="(item,index) in selectHomeWork" :title="item.studentName"
						:rightText="item.classTimeName" clickable
						@click="goTohomeworkDetails(item.id,item.studentId)" />
				</uni-list>
			</view>
			<view v-show="current === 1">
				<uni-list>
					<uni-list-item showArrow v-for="(item,index) in makeUpTableData" :title="item.studentName"
						:rightText="item.classTimeName" clickable
						@click="goTohomeworkDetails(item.id,item.studentId)" />
				</uni-list>
			</view>
			<view v-show="current === 2">
				<uni-list>
					<uni-list-item showArrow v-for="(item,index) in undoneData" :title="item.studentName"
						:rightText="item.classTimeName" />
				</uni-list>
			</view>
		</view>
	</view>
	<tab-bar pagePath="/pages/teacher/TeacherWork"></tab-bar>
</template>
<script setup>
import {
	reactive,
	onMounted,
	ref,
	computed
} from 'vue'
import classselector from "../../components/ClassSelector.vue"
import useGlobal from '../../utils/useGlobal.js'

const global = useGlobal()

// 头部分段器
let items = ['全部', '补交', '未交']
let current = ref(0)

function onClickItem(e) {
	if (current.value != e.currentIndex) {
		current.value = e.currentIndex;
	}
}

//全部 分页下拉框
let selectValue = ref('')
let range = [{
	value: "全部",
	text: "全部"
}]


// 班级切换
onMounted(() => {
	global.bus.off("Change");
	global.bus.on('change',()=> {
		getCourseData()
	})
});

async function getCourseData() {
	let result = await global.axios.get('/teacher/coursedata', {
		params: {
			id: 2,//global.data.currentClassId
		}
	})
	console.log('########',result);
	range.length = 1
	if (result.length >= 1) {
		result.forEach(item => {
			range.push({
				value: item.name,
				text: item.name,
			})
		})

		let id = result[0].id
		getTodayHomeWork(id)
		getMakeUpHomeWork(id)
	}
}
getCourseData()
let selectHomeWork = computed(() => {
	if (!selectValue.value || selectValue.value == '全部') return homeworkList
	return homeworkList.filter(item => item.classTimeName == selectValue.value)
})

//--------//请求当天作业-----------------
let homeworkList = reactive([])
async function getTodayHomeWork(classTimeId) {
	let result = await global.axios.get('/teacher/todayhomework', {
		params: {
			id: classTimeId
		}
	})
	console.log('getTodayHomeWork', result);
	homeworkList.length = 0
	undoneData.length = 0
	result.forEach(item => {
		if (item.files) {
			homeworkList.push(item)
		} else {
			undoneData.push(item)
		}

	})
}

//---------------请求补交作业------------
let makeUpTableData = reactive([])
async function getMakeUpHomeWork(classTimeId) {
	let result = await global.axios.get('/teacher/makeuphomework', {
		params: {
			classId: 2,
			// global.data.currentClassId
			classTimeId: classTimeId
		}
	})
	console.log('getMakeUpHomeWork', result);
	makeUpTableData.length = 0
	result.forEach(item => {
		if (item.files) {
			makeUpTableData.push(item)
		}
	})
}



// -------------未交作业表格-------------
let undoneData = reactive([])






//----------跳转作业详情页------------
function goTohomeworkDetails(hwId, stuId) {
	uni.navigateTo({
		url: './TeacherWorkDetails?hwId=' + hwId + '&stuId=' + stuId
	})
}
</script>
<style lang="scss">
.select {
	margin: 15px
}
</style>
