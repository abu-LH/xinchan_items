<template>
	<view class="inputs"><input v-model="newClassName" placeholder="请输入班级名" /></view>
	<uni-data-select class="selects" v-model="newTeacher.value" :localdata="teachers" @change="teaChange" placeholder="请选择教师"></uni-data-select>
	
	<view>学生列表：</view>
	<view v-for="(item, index) in students">
		<checkbox :value="item.value" :checked="item.checked" @click="check(index)"/>
		<span>{{ item.text }}</span>
	</view>
	
	<view><uni-tag text="完成编辑" type="primary" @click="done" class='tag'></uni-tag></view>
	<tab-bar></tab-bar>
</template>

<script setup>
	import {
		ref,
		onBeforeMount,
		reactive,
	} from 'vue'
	import useGlobal from '../../utils/useGlobal'
	
	const global = useGlobal()
	let schoolId =  global.data.me.schoolId
	
	let teachers = reactive([])			// 所有教师
	let students = reactive([])			// 所有学生
	
	let newClassName = ref('')				// 班级新名字
	let newTeacher = ref({						// 班级新教师
		text: '',
		value: ''
	})
	let newStudents = reactive([])				// 班级新学生
	
	async function getData(){
		let getUsers = (await global.axios.get('/admin/normalUsers',
		    { params: { schoolId } }))
			
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
			}
		})
	}
	getData()
	
	function teaChange(e){
		for(let i of teachers){
			if(i.value == e){
				newTeacher.value.text = i.text
			}
		}
	}
	
	function check(index){
		students[index].checked = !students[index].checked
	}
	
	async function done(){
		for(let i of students){
			if(i.checked){
				newStudents.push(i.value)
			}
		}
		
		let addClass = await global.axios.post('/admin/addClass', {
		    newData: [{
		        schoolId,
		        name: newClassName.value,
				teacher: newTeacher.value.value,
				students: newStudents
		    }]
		})

		let getNewClass = (await global.axios.get('/admin/getNewClass',
		    { params: { 
		        newClass: newClassName.value, 
		        schoolId }}
		))
		
		if(newTeacher.value.value - 0 != 0){
		    let updateTeachers = await global.axios.post('/admin/addClassesUsers', {
		        newData: [{
	                classId: getNewClass[0].id,
	                users: [newTeacher.value.value],
	                isTeacher: 1
	            }]
	        })
	    }
		
	    if(newStudents.length > 0){
	        let updateStudents = await global.axios.post('/admin/addClassesUsers', {
	            newData: [{
	                classId: getNewClass[0].id,
	                users: newStudents,
	                isTeacher: 0
	            }]
	        })
	    }
		
		uni.navigateTo({
			url:'newClass'
		});
	}
</script>

<style>
	
	.tag{
		position: absolute;
		top: 0.7rem;
		right: 0.5rem;
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