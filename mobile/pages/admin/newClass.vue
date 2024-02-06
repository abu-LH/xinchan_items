<template>
	<div>
		<uni-section title="班级查看" type="line">
			<uni-list v-for="(title, index) in tableData">
				<uni-list-item clickable :title='title.name' :note="'当前课程:' + title.courseName" @click="getClassesUsers(index)" link>
				</uni-list-item>
			</uni-list>
		</uni-section>
	</div>
	
	<view><uni-tag text="添加班级" type="primary" class='tag' @click="addClass"/></view>
	<tab-bar></tab-bar>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import useGlobal from '../../utils/useGlobal'
import {onShow,onLoad} from '@dcloudio/uni-app'

const global = useGlobal()
let schoolId = global.data.me.schoolId

let tableData = reactive([]) as any
let courses = reactive([]) as any
let thisId = ref('')
let delOradd = ref('')

onLoad((e)=>{
	thisId.value = e.id
	delOradd.value = e.delOradd
})
onShow(() => {
	getClassesData()
})

// 查询基础班级信息
async function getClassesData() {
	tableData.length = 0
	courses.length = 0
	
    let getClassesData = (await global.axios.get('/admin/getClasses',
        { params: { schoolId: schoolId } }))

    let getCoursesData = (await global.axios.get('/admin/getCourses',
        { params: { schoolId: schoolId } }))
    getCoursesData.forEach(item => courses.push(item))

    getClassesData.forEach(item => {
        let courseName = ref('')
        let courseId = ref('')

        for(let i of getCoursesData){  
            if(item.courseId == i.id){
                courseName.value = i.name
                courseId.value = i.id
            }
        }
        tableData.push({
            name: item.name,
            id: item.id,
            courseName: courseName.value,
            courseId: courseId.value
        })
    })
	
	if(thisId.value != '' && delOradd.value == 'del'){
		for(let i = tableData.length - 1; i > 0 ; i--){
			if(tableData[i].id == thisId.value){
				tableData.splice(i, 1)
			}
		}
	}
}


// 跳转到班级详情页
function getClassesUsers(index){
	uni.navigateTo({
		url:'classesDetail?id=' + tableData[index].id
	});
}

//跳转到添加班级页
function addClass(){
	uni.navigateTo({
		url:'addClass'
	});
}

</script>

<style>

.tag{
	position: absolute;
	top: 0.5rem;
	right: 0.5rem
}

	
</style>