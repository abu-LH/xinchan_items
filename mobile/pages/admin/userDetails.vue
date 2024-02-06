<template>
	<view v-for="item in tableData">
		<uni-section class="mb-10" title="用户名">
			<template v-slot:right>
				{{ item.username}}
			</template>
		</uni-section>
		<uni-section class="mb-10" title="姓名">
			<template v-slot:right>
				{{ item.name}}
			</template>
		</uni-section>
		<uni-section class="mb-10" title="手机号">
			<template v-slot:right>
				{{ item.phone}}
			</template>
		</uni-section>
		<uni-section class="mb-10 IDnumber" title="身份证号">
			<template v-slot:right>
				{{ item.identityNo}}
			</template>
		</uni-section>
		<uni-section class="mb-10" title="邮箱">
			<template v-slot:right>
				{{ item.email}}
			</template>
		</uni-section>
	</view>
	<br />
	<uni-tag :inverted="true" text="删除此用户" type="error" class='delBtn' @click="deleteUsers()" link/>
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

	let id = ref()
	onShow(() => {
		usersAudit()
	})
	onLoad((e) => {
		id.value = e.id
	})

	let tableData = reactive([])
	console.log(tableData)
	// 查询用户
	let usersAudit = async () => {
		let schoolId = global.data.me.schoolId
		let result = (await global.axios.get('/admin/normalUsers', {
			params: {
				schoolId: schoolId
			}
		}))

		result.forEach(item => {
			if (item.id == id.value) {
				tableData.push({
					name: item.name,
					username: item.username,
					id: item.id,
					phone: item.phone,
					email: item.email,
					identityNo: item.identityNo,
					boolean: false
				})
			}
		})
	}


	tableData.forEach(item => {
		item.id = id.value
	})

	async function deleteUsers() {

		let result = await global.axios.post('/admin/deleteUsers', {
			oldData: [{
				name: tableData[0].name,
				id: id.value
			}]
		})
		
		uni.navigateTo({
			url:'userManagement'
		})
	}
</script>

<style>
	.delBtn {
		margin: 8.5rem;
	}
</style>
