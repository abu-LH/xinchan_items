<template>
	<view>
		<view class="text">
			<text v-if="bols" style="color: green;">你已经在打卡范围</text>
			<text v-else style="color: red;">你不在打卡范围</text>
		</view>

		<button v-if="bol" class="button" type="primary" @tap="toggle">打卡</button>

		<icon type="success" size="155" class="icon" v-else-if="bols" />
		<icon type="cancel" size="155" class="icon" v-else />
<button  type="primary" @click="clocklist" class="popup-content" >查看</button>
	</view>
		<tab-bar pagePath="/pages/student/clock"></tab-bar>
</template>

<script setup>
	import useGlobal from '@/utils/useGlobal.js'
	import {
		reactive,
		ref
	} from 'vue';

	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app'

	const global = useGlobal();
	let a1 = ''; //经度
	let b1 = ''; //纬度
	let a2 = '';
	let b2 = '';
	let c1 = '';
	let c2 = '';
	let a = '';
	let b = '';
	let s = ''; //距离
	let bol = ref(true);
	let bols = ref(true);
	let currentdate = reactive();
    let location = reactive();  //位置
    let state = ref('打卡成功');  //位置
    let states = ref('打卡失败');  //位置

	onShow(() => {
		getCurLocation();
		query()
	})
	const popup = ref(null);


	//打卡
   function toggle () {
		bol.value = false
		getCurrentDate()
		if (!bols.value  ) {
			 getclocks()
			 
		}else{
			getclock() 
				 
		}
	}
	function clocklist(){
		uni.navigateTo({
			url:'clock-list' 
		})
	}
	async function getclock() {
		await global.axios.post('/student/addclock', {
			 schoolId:1,
			 userId:8,
			 isLeaving:1,
			 createTime:currentdate,
			 state:state.value,
		})
	}
	async function getclocks() {
		await global.axios.post('/student/addclock', {
			 schoolId:1,
			 userId:8,
			 isLeaving:1,
			 createTime:currentdate,
			 state:states.value,
		})
	}
	//转化时间
	function getCurrentDate() {
		var date = new Date();
		var seperator1 = "-";
		var seperator2 = ":";
		var seperator3 = " ";
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		var H = date.getHours(); //小时 
		var M = date.getMinutes(); //分 
		var S = date.getSeconds(); //秒 

		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		currentdate = year + seperator1 + month + seperator1 + strDate + seperator3 + H + seperator2 + M + seperator2 + S;
		console.log(currentdate)
	}

	function getCurLocation() {
		uni.getLocation({
			type: 'wgs84',
			success: function(res) {
				a1 = res.longitude
				b1 = res.latitude
				console.log('当前位置的经度：' + a1);
				console.log('当前位置的纬度：' + b1);
			}
		});
	}
	//获取学校经度，维度
	async function query() {
		  location = await global.axios.get('/student/clock', {
			params: {
				id:global.data.me.id, //学校shoolid      
			}
		})
		console.log(location)
		a2 = location[0].longitude
		b2 = location[0].latitude
		let c1 = Math.abs(parseFloat(a1) - parseFloat(a2))
		let c2 = Math.abs(parseFloat(b1) - parseFloat(b2))
		a = c1 * c1
		b = c2 * c2
		s = a + b
		// console.log(a)
		// console.log(s)
		console.log(s)
		if (s > 1) {
			bols.value = false	 	 
		}
		
		// const {asin, sqrt, sin, cos} = Math
		// s= 2 * asin(sqrt(sin(a/2)**2 + cos(lat1)*cos(lat2)*sin(b/2)**2)) * 6378.137


	}
</script>
<style scoped>
	.text {
		margin:0 auto;
		text-align: center;
		line-height:70px;
		font-size: 18px;
		font-weight: 800;
		border-bottom: 1px solid skyblue;
	}

	.button {
		margin: 37% 31%;
		width: 150px;
		height: 150px;
		line-height: 150px;
		border-radius: 75px;
		background-color: darkgreen;
	}

	.icon {
		margin: 37% 31%;

	}
	.popup-content { 
	    width: 50%;
		border-radius: 10px;
	}
</style>
