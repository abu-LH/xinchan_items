<template>
	<view class="back">
		<text>姓名</text>
		<text>早/晚</text>
		<text>地址</text>
	</view>
	<view v-for="item in biao.arr" class="back" style="background: none;color: black;border-bottom: 1px solid black;font-size: 15rpx;">
		<text>{{item.name}}</text>
		<view>
		<text>早:{{item.createTime}}</text>
		<br>
		<text>晚:{{item.updateTime}}</text>
		</view>
		<text>惠州信息产业</text>
	</view>
</template>

<script setup>
	import useGlobal from "../../utils/useGlobal";
	import { reactive ,onMounted} from "vue";
	
	const global=useGlobal()
	const biao=reactive({
		arr:[]
	})
	
		onMounted(() => {
			onload()
			global.bus.on('change',onload)
			

		});
	
async function onload(i){
		let name;
		uni.getStorage({
			key: '名字',
			success: function (res) {
				name=res.data
			}
		});
		let data = await global.axios.post('teacher/studentDEtails', {
		  name: name,
		  id:global.data.currentClassId
		});
		biao.arr=data.filter(item=>item.createTime=new Date(item.createTime).toLocaleString())
		biao.arr=data.filter(item=>item.updateTime=new Date(item.updateTime).toLocaleString())
	}
onload()
	
</script>

<style scoped>
	.back{
		background: linear-gradient(to left, #03D994, #0AD183);
		height: 100rpx;
		width: 100%;
		display: flex;
		justify-content: space-between;
		padding: 40rpx;
		align-items: center;
		color: white;
		box-sizing: border-box;
	}
</style>