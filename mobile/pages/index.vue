<template>
	<view>
		首页
	</view>
	<tab-bar></tab-bar>
</template>

<script setup>
import {
	onMounted
} from "vue"
import useGlobal from '../utils/useGlobal.js'

const global = useGlobal()
onMounted(() => {
	console.log(1)
	if (global.data.me) {
		if (global.data.me.status !== "正常") {
			uni.navigateTo({
				url: '/pages/platform-admin/Administrator'
			})
		} else {
			uni.navigateTo({
				url: '/pages/'+global.data.me.roleType+'/index'
			})
		}
	} else {
		uni.navigateTo({
			url: '/pages/login'
		})
	}
})
</script>

<style>

</style>
