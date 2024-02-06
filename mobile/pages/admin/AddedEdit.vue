<template>
	<view v-if="!edit">
		<uni-list-item :title="'当前课程: ' + courseName"></uni-list-item>
		
		<uni-section title="班级列表" type="line">
			<uni-list v-for="(title, index) in classes">
				<uni-list-item :title='title.text' v-if="title.checked">
				</uni-list-item>
			</uni-list>
		</uni-section>
	</view>

	<view v-if="edit">
		<view>请输入课程名：</view><input v-model="newName" placeholder="请输入课程名" />

		<view>班级列表：</view>
		<view v-for="(item, index) in newClasses">
			<checkbox :value="item.value" :checked="item.checked"  @click="check(index)"/>
			<span>{{ item.text }}</span>
		</view>

	</view>
	
	<view><uni-tag text="编辑课程" type="primary" @click="edits" class='tag' v-if="!edit"/></view>
	
	<view><uni-tag text="删除本课程" type="error" @click="errorTags" class='tag2' v-if="!edit"/></view>
	
	<view><uni-tag text="编辑完成" type="primary" @click="done" class='tag' v-if="edit"/></view>
	
	<view><uni-tag text="取消编辑" type="warning" @click="cencal" class='tag2' v-if="edit"></uni-tag></view>
	
	<uni-card :is-shadow="false" v-if="errorTag" class="errorTags">
		是否删除本课程？
		<span><uni-tag text="否" type="primary" class="errorTag" @click="dontError"/></span>
		<span><uni-tag text="是" type="error" class="errorTag" @click="deleteCourse"/></span>
	</uni-card>
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
	const global = useGlobal()

	let schoolId = global.data.me.schoolId
	let edit = ref(false)
	let errorTag = ref(false)

	let id = ref('')					// 课程id
	onLoad((e) => {
		id.value = e.id
	})
	
	let courseName = ref('')			// 课程名字
	let classes = reactive([])			// 所有班级（不包含正在上其它课程的班级）
	let newName = ref('')				// 课程新名字
	let newClasses = reactive([])		// 新班级列表
	
	async function getData(){
		let getClassesData = (await global.axios.get('/admin/getClasses',
		    { params: { schoolId: schoolId } }))
		
		let getCoursesData = (await global.axios.get('/admin/getCourses',
		    { params: { schoolId: schoolId } }))
			
		getClassesData.forEach((item) => {
			if(item.courseId == 0 || item.courseId == id.value){
				classes.push({
					text: item.name,
					value: item.id,
					checked: item.courseId == id.value
				})
				
				newClasses.push({
					text: item.name,
					value: item.id,
					checked: item.courseId == id.value,
				})
			}
		})
		
		console.log(newClasses)
		
		getCoursesData.forEach((item) => {
			if(item.id == id.value){
				courseName.value = item.name
			}
		})
	}
	getData()
	
	function edits(){
		edit.value = true
		newName.value = courseName.value
	}
	
	function check(index){
		newClasses[index].checked = !newClasses[index].checked
	}
	
	function cencal(){
		edit.value = false
		newName.value = courseName.value
		for(let i = 0; i < classes.length; i++){
			newClasses[i].checked = classes[i].checked
		}
	}
	
	async function done(){
		edit.value = false
		
		let updateCourse = await global.axios.post('/admin/updateCourse', {
		    newData: [{
		        id: id.value,
		        name: newName.value
		    }]
		})
		
		let deleteClassCourse = await global.axios.post('/admin/deleteClassCourse', {
		    newData: [{
		        courseId: id.value,
		    }]
		})
		
		let thisClasses = reactive([])
		for(let i of newClasses){
			if(i.checked){
				thisClasses.push(i.value)
			}
		}
		
		if(thisClasses.length > 0){
		    let updateClassCourse = await global.axios.post('/admin/updateClassCourse', {
		        newData: [{
		            courseId: id.value,
		            classes: thisClasses
		        }]
		    })
		}
		
		courseName.value = newName.value
		for(let i = 0; i < classes.length; i++){
			classes[i].checked = newClasses[i].checked
		}
	}
	
	function errorTags(){
		errorTag.value = true
	}
	
	function dontError(){
		errorTag.value = false
	}
	
	async function deleteCourse() {		// 删除本课程
	    let updateClassCourse = await global.axios.post('/admin/deleteClassCourse', {
	        newData: [{
	            courseId: id.value
	        }]
	    })
	    
	    let deleteCourse = await global.axios.post('/admin/deleteCourse', {
	        newData: [{
	            id: id.value,
	            schoolId
	        }]
	    })
		
		uni.navigateTo({
			url:'Added?id=' + id
		})
	}
	
</script>

<style>
	.tag {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
	}
	
	.tag2{
		position: absolute;
		top: 2.5rem;
		right: 0.5rem;
	}
	
	.errorTag{
		margin-left: 1rem;
		margin-right: 0.8rem;
	}
	
	.errorTags{
		position: absolute;
		top: 10rem;
		width: 86%;
		z-index: 10;
	}
</style>
