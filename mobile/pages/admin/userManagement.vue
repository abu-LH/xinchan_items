<template>
	<uni-section class="mb-10 Section" v-for="(item,index) in tableData" :title="item.name" :sub-title="'用户名：'+item.username"
		type="circle" link @click="userJump(index)">
		<template v-slot:right>
			<uni-icons custom-prefix="custom-icon" type="forward" size="15"></uni-icons>
		</template>
	</uni-section>
	<tab-bar></tab-bar>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'
	import useGlobal from '../../utils/useGlobal'

	

	const global = useGlobal()
	let tableData = reactive([])
	console.log(tableData)

	async function usersAudit() {
		let schoolId = global.data.me.schoolId
		let result = (await global.axios.get('/admin/normalUsers', {
			params: {
				schoolId: schoolId
			}
		}))
		result.forEach(item => tableData.push({
			name: item.name,
			username: item.username,
			id: item.id,
			phone: item.phone,
			email: item.email,
			identityNo: item.identityNo,
			boolean: false
		}))
	}
	usersAudit()

	function userJump(index) {
		uni.navigateTo({
			url: 'userDetails?id=' + tableData[index].id
		})
	}
</script>

<style>
	.Section {
		height: 4rem;
	}
</style>
