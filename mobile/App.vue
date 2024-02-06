<script>
export default {
	onLaunch: function () {
		console.log('App Launch')
	},
	onShow: function () {
		console.log('App Show')
		// setTimeout(function () {
		// 	const global=(()=>{
		// 		return import('./utils/useGlobal.js')
		// 	})()
		// 	console.log(global)
		// 	if (global.data.me) {
		// 		if (global.data.me.status !== "正常") {
		// 			uni.navigateTo({
		// 				url: '/pages/platform-admin/Administrator'
		// 			})
		// 		} else {
		// 			uni.navigateTo({
		// 				url: '/pages/' + global.data.me.roleType + '/index'
		// 			})
		// 		}
		// 	} else {
		// 		uni.navigateTo({
		// 			url: '/pages/login'
		// 		})
		// 	}
		// }, 20)

	},
	onHide: function () {
		console.log('App Hide')
	}
}
</script>

<style>
/*每个页面公共css */
uni-page-body {
	padding-top: 20rpx;
	height: 100%;
	font-size: 15px;
	padding-bottom: 120rpx;
	overflow: auto !important;
}


body {
	background-color: #fafafa;
}

radio-group,
uni-label {
	display: flex !important;
}
</style>
