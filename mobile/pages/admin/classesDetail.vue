<template>
	<view v-if="!edit">
		<uni-list-item :title="'班级名: ' + tableData.name"></uni-list-item>
		<uni-list-item :title="'当前课程: ' + tableData.courseName"></uni-list-item>
		<uni-list-item :title="'当前任课教师: ' + tableData.teacherName"></uni-list-item>
	
		<uni-section title="学生列表" type="line">
			<uni-list v-for="(title, index) in students">
				<uni-list-item :title='title.text' :rightText="'用户名:' + title.username" v-if="title.checked">
				</uni-list-item>
			</uni-list>
		</uni-section>
	</view>
	
	<view v-else>
		<view class="inputs"><input v-model="tableData.name" placeholder="请输入班级名" /></view>
		<uni-data-select class="selects" v-model="newTeacher.value" :localdata="teachers" @change="teaChange" placeholder="请选择任课教师"></uni-data-select>
		<uni-data-select class="selects" v-model="newCourse.value" :localdata="courses" @change="courseChange" placeholder="请选择当前课程"></uni-data-select>
		
		<view>学生列表：</view>
		<view v-for="(item, index) in students">
			<checkbox :value="item.value" :checked="item.checked" @click="check(index)"/>
			<span>{{ item.text }}</span>
		</view>
		
	</view>
	
	<view><uni-tag text="编辑本班" type="primary" @click="edits" class='tag' v-if="!edit"/></view>
	
	<view><uni-tag text="删除本班" type="error" @click="errorTags" class='tag2' v-if="!edit"/></view>
	
	<view><uni-tag text="完成编辑" type="primary" @click="done" class='tag' v-if="edit"></uni-tag></view>
	
	<view><uni-tag text="取消编辑" type="warning" @click="cencal" class='tag2' v-if="edit"></uni-tag></view>
	
	<uni-card :is-shadow="false" v-if="errorTag" class="errorTags">
		是否删除本班？
		<span><uni-tag text="否" type="primary" class="errorTag" @click="dontError"/></span>
		<span><uni-tag text="是" type="error" class="errorTag" @click="deleteClass"/></span>
	</uni-card>
</template>

<script setup>
	import useGlobal from '../../utils/useGlobal'
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
	
	let id = reactive()
	onShow(() => {
		query()
	})
	onLoad((e)=>{
		 id = e.id
	})
	
	let tableData = ref({
		name: '',
		id,
		courseName: '暂无',
		courseId: '',
		teacherName: '暂无',
		teacherId: '',
	})
	
	let classes_users = reactive([])	// 班级与用户关系表
	let teachers = reactive([])			// 所有教师
	let students = reactive([])			// 所有学生
	let courses = reactive([])			// 所有课程
	let edit = ref(false)				// 是否进入编辑状态
	let thisStudents = reactive([])		// 学生列表暂存
	
	let newClassName = ref('')		// 班级新名字
	let newCourse = ref({					// 班级新课程
			text: '',
			value: ''
		})
	let newTeacher = ref({						// 班级新教师
		text: '',
		value: ''
	})
	let newStudents = reactive([])				// 班级新学生
	
	let errorTag = ref(false)
	
	//获取班级信息详情
	let query = async () => {
		let getClassesData = (await global.axios.get('/admin/getClasses',
		    { params: { schoolId } }))
		
		let getCoursesData = (await global.axios.get('/admin/getCourses',
		    { params: { schoolId } }))
			
		let getUsers = (await global.axios.get('/admin/normalUsers',
		    { params: { schoolId } }))
			
		let getClasses_users = (await global.axios.get('/admin/getClassesUsers',
		    { params: { schoolId } }))

		
		getClassesData.forEach(item => {
			if(item.id == id){
				tableData.value.name = item.name
				tableData.value.courseId = item.courseId
			}
		})
		
		getCoursesData.forEach(item => {
			courses.push({
				text: item.name,
				value: item.id
			})
			if(item.id == tableData.value.courseId){
				tableData.value.courseName = item.name
			}
		})
		
		getUsers.forEach(item => {
			if(item.role == "教师"){
				teachers.push({
					value: item.id,
					text: item.name
				})
			}else if(item.role == "学生"){
				students.push({
					text: item.name,
					value: item.id,
					username: item.username,
					checked: false
				})
				
				thisStudents.push({
					text: item.name,
					value: item.id,
					username: item.username,
					checked: false
				})
			}
		})
		
		getClasses_users.forEach(item => {
			if(item.classId == id){
				for(let i of teachers){
					if(item.userId == i.value){
						tableData.value.teacherName = i.text
						tableData.value.teacherId = i.value
					}
				}
				
				for(let i of students){
					if(item.userId == i.value){
						i.checked = true
					}
				}
				
				for(let i of thisStudents){
					if(item.userId == i.value){
						i.checked = true
					}
				}
			}
		})
		
		newClassName.value = tableData.value.name
		newTeacher.value.text = tableData.value.teacherName
		newTeacher.value.value = tableData.value.teacherId
		newCourse.value.text = tableData.value.courseName
		newCourse.value.value = tableData.value.courseId
	}
	
	function edits(){
		dontError()
		
		edit.value = true
		newStudents.length = 0
	}
	
	function teaChange(e){
		for(let i of teachers){
			if(i.value == e){
				newTeacher.value.text = i.text
			}
		}
	}
	
	function courseChange(e){
		for(let i of courses){
			if(i.value == e){
				newCourse.value.text = i.text
			}
		}
	}
	
	function check(index){
		students[index].checked = !students[index].checked
	}
	
	function done(){
		for(let i of students){
			if(i.checked){
				newStudents.push({
					id: i.value
				})
			}
		}
		tableData.value.courseName = newCourse.value.text
		tableData.value.courseId = newCourse.value.value
		tableData.value.teacherName = newTeacher.value.text
		tableData.value.teacherId = newTeacher.value.value
		
		for(let i = 0; i < students.length; i++){
			thisStudents[i].checked = students[i].checked
		}
		
		updateClassesUsers()
		
		cencal()
	}
	
	function cencal(){
		edit.value = false
		newCourse.value.text = tableData.value.courseName
		newCourse.value.value = tableData.value.courseId
		newTeacher.value.text = tableData.value.teacherName
		newTeacher.value.value = tableData.value.teacherId
		
		for(let i = 0; i < students.length; i++){
			students[i].checked = thisStudents[i].checked
		}
	}
	
	async function updateClassesUsers(){
		let updateClass = await global.axios.post('/admin/updateClasses', {
		    newData: [{
		        classId: id,
		        newCourseId: tableData.value.courseId,
		        name: tableData.value.name,
				teacher: newTeacher.value.value,
				students: newStudents
		    }]
		})
		
		let thisUserData = reactive([])
		for(let i of newStudents){
			thisUserData.push({
				id: i.id,
				isTeacher: 0
			})
		}
		thisUserData.push({
			id: newTeacher.value.value,
			isTeacher: 1
		})
		
		let updateUsers = await global.axios.post('/admin/updateClassesUsers', {
		    newData: [{
		        classId: id,
		        users: thisUserData
		    }]
		})
	}
	
	function errorTags(){
		errorTag.value = true
	}
	
	function dontError(){
		errorTag.value = false
	}
	
	async function deleteClass() {		// 删除本班
	    let deleteClass = await global.axios.post('/admin/deleteClass', {
	        newData: [id]
	    })
		
		uni.navigateTo({
			url:'newClass?id=' + id + '&delOradd=del'
		})
	}
	
</script>

<style>
	
	.tag{
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
	
	.inputs{
		border: 0.1rem #CCC solid;
		width: 75%;
		padding-left: 1.5%;
		margin-left: 1%;
		margin-bottom: 1%;
		border-radius: 0.2rem;
	}
	
	.selects{
		width: 75%;
		height: 2.2rem;
		margin-left: 1%;
	}
</style>