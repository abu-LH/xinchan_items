<template>
	<view class="uni-tabbar">
		<view class="uni-tabbar__item" v-for="(item,index) in tabbarList.tabbar" :key="index" @tap="changeTab(item)">
			<!-- <view class="icon" :class="[item.fontIcon , item.pagePath == pagePath?'uni-active':'']"></view> -->
			<view v-if="true" class="uni-tabbar__bd">
				<view class="uni-tabbar__icon">
					<image v-if="item.pagePath == pagePath" class="uni-w-42 uni-h-42" mode="aspectFit"
				 
						:src="item.selectedIconPath"></image>
					<image v-else class="uni-w-42 uni-h-42" mode="aspectFit" :src="item.iconPath"></image>
				</view>
			</view>
			<view class="uni-tabbar__label" :class="{'active': item.pagePath == pagePath}">
				{{item.text}}
			</view>
		</view>
	</view>
</template>

<script setup>
	import useGlobal from '../utils/useGlobal'
	import {
		onMounted,
		reactive,
		toRefs
	} from 'vue'
	import tabBar from '../utils/tabbar'
	const global = useGlobal()

	const props = defineProps({
		pagePath: String
	})
	let {
		pagePath
	} = toRefs(props)
	console.log(pagePath)

	let tabbarList = reactive({
		tabbar: {}
	})

	onMounted(() => {
		// true为判断条件，根据实际的需求替换即可
		if (global.data.me) {
			if (global.data.me.roleType !== 'platform-admin') {
				tabbarList.tabbar = tabBar[global.data.me.roleType]
					// console.log('tabbar'+tabbarList.tabbar)
			} else {
				tabbarList.tabbar = tabBar.platformAdmin
			}
		}
	})
	let changeTab = (item) => {
		console.log(item)
		uni.navigateTo({
			url: item.pagePath
		});
	}
</script>

<style lang="scss" scoped>
	[nvue] uni-scroll-view,
	[nvue] uni-swiper-item,
	[nvue] uni-view {
		flex-direction: unset;
	}

	[nvue-dir-column] uni-swiper-item,
	[nvue-dir-column] uni-view {
		flex-direction: unset;
	}

	.uni-tabbar {
		position: fixed;
		bottom: 0;
		z-index: 999;
		width: 100%;
		display: flex;
		justify-content: space-around;
		height: 98rpx;
		padding: 16rpx 0;
		box-sizing: border-box;
		border-top: solid 1rpx #ccc;
		background-color: #fff;
		box-shadow: 0px 0px 17rpx 1rpx rgba(206, 206, 206, 0.32);

		.uni-tabbar__item {
			display: block;
			line-height: 24rpx;
			width: 60rpx;
			font-size: 20rpx;
			text-align: center;
		}

		.uni-tabbar__icon {
			height: 42rpx;
			line-height: 42rpx;
			text-align: center;
			 .uni-h-42{
		     height: 40rpx;
			 width: 60rpx;
		}
		}
       
		.icon {
			display: inline-block;
		}

		.uni-tabbar__label {
			line-height: 36rpx;
			font-size: 20rpx;
			color: #999;

			&.active {
				color: green;
			}
		}
	}
</style>
