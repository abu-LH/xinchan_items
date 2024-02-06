<template>
	<uni-list-item :title="'机构名: ' + name"></uni-list-item>
	
	<uni-section title="机构位置" type="line">
		<uni-list-item :title="'经度: ' + long"></uni-list-item>
		<uni-list-item :title="'纬度: ' + lat"></uni-list-item>
	</uni-section>
	
	<uni-section title="你的当前位置" type="line">
		<uni-list-item :title="'经度: ' + myLong"></uni-list-item>
		<uni-list-item :title="'纬度: ' + myLat"></uni-list-item>
	</uni-section>
	
	<uni-section title="请输入新机构位置" type="line"></uni-section>
	<view class="texts">
		<input class="inputs" v-model="newLong" placeholder="经度" />
		<input class="inputs" v-model="newLat" placeholder="纬度" />
	
		<button type="primary" size="mini" class="buttons" @click="updateLocation">确定</button>
	</view>
	<tab-bar></tab-bar>
</template>

<script setup>
	import useGlobal from '@/utils/useGlobal.js'
	import {
		reactive,
		ref
	} from 'vue';
	
	const global = useGlobal()
	let schoolId = global.data.me.schoolId
	
	let name = ref('')			// 机构名称
	let lat = ref('')			// 机构位置纬度
	let long = ref('')			// 机构位置经度
	let newLat = ref('')		// 新机构位置纬度
	let newLong = ref('')		// 新机构位置经度
	let myLat = ref('')			// 当前位置纬度
	let myLong = ref('')		// 当前位置经度
	
	function getMyLocation() {
		uni.getLocation({
			type: 'wgs84',
			success: function(res) {
				myLong.value = res.longitude
				myLat.value = res.latitude
			}
		});
	}
	getMyLocation()
	
	async function getLocation() {
	    let getLocation = (await global.axios.get('/admin/getLocation',
	        { params: { schoolId: schoolId } }))
	    name.value = getLocation[0].name
	    lat.value = getLocation[0].latitude
	    long.value = getLocation[0].longitude
	}
	getLocation()
	
	async function updateLocation(){
	    let updateLocation = await global.axios.post('/admin/updateLocation', {
	        newData: [{
	            id: schoolId,
	            lat: newLat.value,
	            long: newLong.value
	        }]
	    })
	
	    lat.value = newLat.value
	    long.value = newLong.value
	}
	
</script>

<style>
	.inputs{
		border: 0.1rem #CCC solid;
		width: 20%;
		padding-left: 1.5%;
		margin-left: 1%;
		margin-bottom: 1%;
		border-radius: 0.2rem;
		display: inline-block;
		margin-left: 1rem;
	}
	
	.buttons{
		margin-left: 5rem;
	}

	.texts{
		background-color: #fff;
		padding-top: 0.1rem;
	}
</style>