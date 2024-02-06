<template>
	<view>
		<uni-forms ref="form" :modelValue="user" :rules="rules" v-for="item in tableData" class='forms'>
			<uni-forms-item label="姓名" name="name">
				<uni-easyinput type="text" v-model="item.name" disabled="disableds" class="inf" />
			</uni-forms-item>
			<uni-forms-item label="申请人身份" name="name">
				<uni-easyinput type="text" v-model="item.role" disabled="disableds" class="inf" />
			</uni-forms-item>
			<uni-forms-item label="手机号" name="name">
				<uni-easyinput type="text" v-model="item.phone" disabled="disableds" class="inf" />
			</uni-forms-item>
			<uni-forms-item label="邮箱" name="name">
				<uni-easyinput type="text" v-model="item.email" disabled="disableds" class="inf" />
			</uni-forms-item>
			<uni-forms-item label="身份证" name="name">
				<uni-easyinput type="text" v-model="item.identityNo" disabled="disableds" class="inf" />
			</uni-forms-item>
			<uni-forms-item label="身份证照片" name="name" class='imgas'>
				<span class="pic"><img :src="item.identityCardFrontsidePhoto" alt=""></span>
				<span class="pic"><img :src="item.identityCardBacksidePhoto" alt=""></span>
			</uni-forms-item>
		</uni-forms>

		<uni-row class="demo-uni-row " :gutter="gutter" :width="nvueWidth">
			<uni-col :span="3" class='btn'>
				<uni-tag :inverted="true" text="通过" type="success" @click="agree" link/>
			</uni-col>
			<uni-col :span="3" :offset="6">
				<uni-tag :inverted="true" text="拒绝" type="error" @click="refuse"  link/>
			</uni-col>
		</uni-row>
	</view>
</template>

<script setup>
	import useGlobal from '../../utils/useGlobal.js'
	import axios from 'axios';
	import {
		ref,
		onMounted,
		reactive
	} from "vue"
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app'
	const global = useGlobal()
	const picUrl = global.filesBaseUrl

	//加载获取用户信息
	console.log(picUrl)

	let Id;
	

	let tableData = ref([])
	let id = ref()
	onShow(() => {
		usersAudit()
	})
	onLoad((e) => {
		id.value = e.id
	})
	
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

	async function usersAudit() {
		let result = (await global.axios.get('/admin/usersAudit'))
		result.forEach(item => {
			if (item.id == id.value) {
				tableData.value.push(item)
			}
		})

		if (result.length == 0) {
			ElMessage('目前没有可以审核的人员')
		}
		
		user.detail.name = tableData.value[0].name
		user.detail.identity = tableData.value[0].role
		user.detail.phone = tableData.value[0].phone
		user.detail.Id = tableData.value[0].id
		user.detail.IDnumber = tableData.value[0].identityNo
		user.detail.identityCardFrontsidePhoto = picUrl + tableData.value[0].identityCardFrontsidePhoto
		user.detail.identityCardBacksidePhoto = picUrl + tableData.value[0].identityCardBacksidePhoto
		user.detail.index = 0
	}


	const agree = async () => {
		let result = await global.axios.post('/admin/agreeApply', {
			Id: user.detail.Id
		})
		uni.navigateTo({
			url:'index'
		})
	}

	const refuse = async () => {

		let result = await global.axios.post('/admin/refuseApply', {
			Id: user.detail.Id
		})
		uni.navigateTo({
			url:'index'
		})
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
		width: 15rem;
		height: 5.643rem;
		display: inline-block;
		/* margin-right: 1.429rem; */
		/* margin-bottom: 1.429rem; */
	}

	.table {
		border: 0.07rem #E9EEF3 solid;
		margin: auto auto;
	}

	.buttons {
		/* margin-left: 12rem; */
	}

	.btn {
		margin-left: 6rem;
	}

	.imgas {
		height: 10rem;
	}

	.forms {
		padding-left: 1rem;
	}
</style>
