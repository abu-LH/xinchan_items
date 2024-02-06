<template>
	<view class="content-login">
		<form @submit="onLogin">
			<view class="uni-form-item uni-column">
				<view class="title">用户名：</view>
				<input class="uni-input" v-model="userDetail.username" @blur="verifyUserName" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">密码：</view>
				<input class="uni-input" v-model="userDetail.password" password type="text" @blur="verifyPassword" />
			</view>
			<view class="btn">
				<button size="mini" type="primary" form-type="submit">登录</button>
			</view>
			<view class="register">
				<span @click="navToRegister">注册</span>
			</view>
		</form>
	</view>
</template>

<script setup>
import useGlobal from '@/utils/useGlobal.js'
import {
	ref,
	reactive,
} from "vue"

const global = useGlobal()

console.log('global', global)

let userNameF = ref(false)
let passwordF = ref(false)

const userDetail = reactive({
	username: '',
	password: '',
})

let onLogin = async () => {
	verifyUserName()
	verifyPassword()
	if (userNameF.value || passwordF.value) return

	let result = await global.axios.post('/login', userDetail)

	global.data.me = result
	global.data.roleId = result.roleType
	console.log('result' + result)
	console.log('global.data.me', global.data.me)
	if (result.status != '正常') {
		uni.navigateTo({
			url: '/pages/no-school-user/applyfor'
		})
		return
	}
	uni.navigateTo({
		url: '/pages/index'
	})
}


let verifyUserName = () => {
	const reg = /^[a-zA-Z0-9]{4,32}$/
	if (!(reg.test(userDetail.username))) userNameF.value = true
	else userNameF.value = false
}
let verifyPassword = () => {
	const reg = /^\w{6,32}$/
	if (!(reg.test(userDetail.password))) passwordF.value = true
	else passwordF.value = false
}

let navToRegister = () => {
	uni.navigateTo({
		url: "register"
	})
}
</script>

<style scoped>
.content-login {
	border-radius: .714rem;
	height: 100%;
	position: relative;
}

uni-form {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translateY(-50%) translateX(-50%);
}

.uni-form-item {
	display: flex;
}

.uni-form-item:not(:first-child) {
	margin-top: 20rpx;
}

.uni-form-item .uni-input {
	width: 400rpx;
	border-radius: 10rpx;
	height: 60rpx;
	flex: 1;
	background-color: #fff;
}

.uni-form-item .title {
	width: 150rpx;
	text-align: right;
	padding-right: 20rpx;
}

.btn {
	margin-top: 40rpx;
	display: flex;
	align-items: center;
}

.register {
	text-align: right;
}

.btn .uni-button {}
</style>
