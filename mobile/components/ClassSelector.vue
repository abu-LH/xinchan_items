<template>
	<view>
		      <uni-data-select
		        v-model="value"
		        :localdata="range"
		        @change="change" 
				class='range'
		      ></uni-data-select>
	 
	</view>
</template>
<script setup>
	import {
		onMounted,
		reactive,
		ref
	} from "vue";
	import useGlobal from '../utils/useGlobal'
	import {
		onShow,
		onLoad
	} from '@dcloudio/uni-app'
	let range = reactive([])
	let value =ref(1)
	let global = useGlobal()
 
	onMounted(() => {
		classIdGet()
	})
   onLoad(()=>{
	   global.data.currentClassId=1
   })
	function change(e) {
        global.data.currentClassId=e+1
		console.log("e:", e);
		global.bus.emit('change',global.data.currentClassId)
		 
	}
	
	async function classIdGet() {
		let result = await global.axios.get('/public/class-id', {
			params: {
				id: global.data.me.id
			}
		})
		result.forEach((itme, i) => {
			range.push({
				value: i,
				text: itme.className
			})
		})
		// console.log(global.data.me.id)
		
	}
	
</script>
<style scoped>
 .range{
	 width: 97%;
	 margin: 10rpx 10rpx;
 }
	
</style>
