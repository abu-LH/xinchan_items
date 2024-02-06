<template>
	<view>
		<uni-section class="mb-10" v-for="(item,index) in tableData" :data="item" :title="item.name">
			<template v-slot:right>
				<uni-tag :inverted="true" text="查看" type="primary" @click="viewUser(index)" link />
			</template>
		</uni-section>
	</view>
	<uni-notice-bar show-icon scrollable :text="msg" speed='80' v-if="msgbol"/>
	
	<tab-bar></tab-bar>
</template>

<script setup>
	import useGlobal from '../../utils/useGlobal.js'
	import axios from 'axios';
	import {
		ref,
		onMounted,
		reactive
	} from "vue"

	
	const global = useGlobal()
	const picUrl = global.filesBaseUrl

	//加载获取用户信息
	console.log(picUrl)

	let Id;
	let user = reactive({
		detail: {
			name: '请在右边列表中选择人员',
			identity: '',
			phone: '',
			IDnumber: '',
			Id: '',
			identityCardFrontsidePhoto: '',
			identityCardBacksidePhoto: '',
			index: -1,
		}
	})

	let tableData = ref([])
	let msg = ref()
	let msgbol = ref(false)
	async function usersAudit() {
		let result = (await global.axios.get('/admin/usersAudit'))
		result.forEach(item => tableData.value.push(item))

		if (result.length == 0) {
			msg.value = '目前没有可审核的人员!'
			msgbol.value = true
		}
	}
	usersAudit()

	function viewUser(index) {

		if (index != -1) {
			user.detail.name = tableData.value[index].name
			user.detail.identity = tableData.value[index].role
			user.detail.phone = tableData.value[index].phone
			user.detail.Id = tableData.value[index].id
			user.detail.IDnumber = tableData.value[index].identityNo
			user.detail.identityCardFrontsidePhoto = picUrl + tableData.value[index].identityCardFrontsidePhoto
			user.detail.identityCardBacksidePhoto = picUrl + tableData.value[index].identityCardBacksidePhoto
			user.detail.index = index
		} else {
			user.detail.name = ''
			user.detail.identity = ''
			user.detail.phone = ''
			user.detail.Id = ''
			user.detail.IDnumber = ''
			user.detail.identityCardFrontsidePhoto = ''
			user.detail.identityCardBacksidePhoto = ''
			user.detail.index = -1
		}

		uni.navigateTo({
			url: 'indexDetail?id=' + tableData.value[index].id
		})
	}
	const agree = async () => {
		if (user.detail.index != -1) {
			let result = await global.axios.post('/admin/agreeApply', {
				Id: user.detail.Id
			})
			if (result.error) {
				console.log(result.error)
			} else if (result.affectedRows === 1) {
				tableData.value.splice(user.detail.index, 1)
				viewUser(-1)
			}
		}
	}

	const refuse = async () => {
		if (user.detail.index != -1) {
			let result = await global.axios.post('/admin/refuseApply', {
				Id: user.detail.Id
			})
			if (result.error) {
				console.log(result.error)
			} else if (result.affectedRows === 1) {
				tableData.value.splice(user.detail.index, 1)
				viewUser(-1)
			}
		}
	}
</script>

<style>
	.inf {
		/* background-color:rgb(240, 255, 255); */
		/* padding-left: 0.7rem; */
		width: 15.6rem;
		height: 1.8rem;
	}

	.pic {
		width: 20rem;
		height: 5.643rem;
		display: inline-block;
		margin-right: 1.429rem;
		margin-bottom: 1.429rem;
	}

	.table {
		border: 0.07rem #E9EEF3 solid;
		margin: auto auto;
	}

	.buttons {
		margin-left: 12rem;
	}

	.btn {
		margin-left: 6rem;
	}
</style>
