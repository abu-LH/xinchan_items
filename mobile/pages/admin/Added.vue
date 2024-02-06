<template>

	<uni-row class="demo-uni-row ROW" :gutter="gutter" :width="nvueWidth">
		<uni-col :span="12" :pull="6">
			<view class="demo-uni-col dark">
				请输入课程
			</view>
		</uni-col>
		<uni-col :span="6" :push="6">
			<view class="demo-uni-col light">
				<uni-icons custom-prefix="custom-icon" type="plusempty" size="21" @click="displayClasses"
					style='margin-left: 3rem;'></uni-icons>
			</view>
		</uni-col>
	</uni-row>

	<uni-list>
		<uni-list :border="true" v-for="(item,index) in tableData">
			<uni-list-chat :title="'课程：'+item.name"
				avatar='https://pic2.zhimg.com/80/v2-13598c935a1007f91fe10b5edd0b7cb1_1440w.webp'
				:note="'班级：'+item.classes" badge-positon="left" link @click='eadtingBtn(index)'>
				
			</uni-list-chat>
		</uni-list>
	</uni-list>

	<!-- 新增卡片 -->
	<view v-if="popup" class="cardTop">
		<uni-card title="请输入新的课程" extra="">
			<text class="uni-body">
				<div class="text">
					课程：<input type="text" v-model="newCourse" class="item">
				</div>
				<uni-tag :inverted="true" text="确定" type="success" @click="btnYES" />
				<uni-tag :inverted="true" text="取消" type="error" @click="btnNO" />
			</text>
		</uni-card>
	</view>
	
<tab-bar></tab-bar>
</template>

<script setup>
	import {
		ref,
		reactive
	} from "vue";
	import useGlobal from '../../utils/useGlobal'
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app'
	const global = useGlobal()
	
	let thisId = ref('')
	
	onLoad((e) => {
		thisId.value = e.id
	})
	onShow(() => {
		getTableData()
	})

	let newCourse = ref('') // 新课程的名字，通过输入的方式加入

	// 获得信息并整合为一个信息表格
	let tableData = ref([])
	let course = ref([])
	let classes = ref([])
	let schoolId = global.data.me.schoolId


	async function getTableData() {
		let getCourses = (await global.axios.get('/admin/getCourses', {
			params: {
				schoolId: schoolId
			}
		}))
		getCourses.forEach(item => course.value.push(item))

		let getClasses = (await global.axios.get('/admin/getClasses', {
			params: {
				schoolId: schoolId
			}
		}))
		getClasses.forEach(item => classes.value.push(item))

		for (let i of course.value) {
			let thisCourses = {
				name: i.name,
				classes: '',
				id: i.id,
			}
			for (let j of classes.value) {
				if (j.courseId == i.id) {
					thisCourses.classes += (j.name + ' ')
				}
			}
			tableData.value.push(thisCourses)
		}
		
		if(thisId.value){
			for(let i = tableData.value.length - 1; i >= 0; i--){
				if(tableData.value.id == thisId.value){
					tableData.value.splice(i, 1)
				}
			}
		}
		
	}


	function eadtingBtn(index){
		uni.navigateTo({
			url:'AddedEdit?id='+ tableData.value[index].id
		})
	}

	let popup = ref(false)

	//新增课程
	function displayClasses() {
		popup.value = true
	}

	function btnYES() {
		addCourse()
		cancelEdit()
		popup.value = false

	}

	function btnNO() {
		popup.value = false
	}

	// 新增课程信息添加完成
	async function addCourse() {
		let addCourse = await global.axios.post('/admin/addCourse', {
			newData: [{
				schoolId,
				name: newCourse.value
			}]
		})

		let getNewCourse = (await global.axios.get('/admin/getNewCourses', {
			params: {
				newCourse: newCourse.value,
				schoolId
			}
		}))

		tableData.value.push({
			name: newCourse.value,
			id: getNewCourse[0].id,
			classes: ''
		})

		course.value.push({
			id: getNewCourse[0].id,
			name: newCourse.value,
			schoolId
		})

		btnNO()
	}
</script>

<style>
 .cardTop{
	 
	 z-index: 100;
 }
 .item{
	 border: 1px solid #ccc;
	 display: inline-block;
 }
</style>
