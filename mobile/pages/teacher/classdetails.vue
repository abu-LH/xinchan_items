<template>
  <view>
		<uni-section title="学生考勤" type="line">
					<uni-list>
						<uni-list-item v-for="(item,index) in tableData.arr" :title="item.name" link="redirectTo" rightText="查看详情" @click="onClick(index)" />
					</uni-list>
		</uni-section>
		<tab-bar pagePath="/pages/teacher/classdetails"></tab-bar>
  </view>
</template>
    
<script  setup>
import useGlobal from "../../utils/useGlobal";
import { reactive ,onMounted} from "vue";


const global = useGlobal();

const tableData = reactive({
  arr: [],
});

		onMounted(() => {
			load()
			global.bus.on('change',load)

	});

async function load(i) {

	console.log( global.data.currentClassId)
  let data = await global.axios.post(`/teacher/student`, {
    id: global.data.currentClassId,
  });

  tableData.arr = data.filter(item=>item.createTime=new Date(item.createTime).toLocaleString());
     console.log(tableData.arr)
}

load();


function onClick(i){
	uni.setStorage({
		key: '名字',
		data: tableData.arr[i].name,
		success: function () {
			console.log('success');
		}
	});
	
	uni.navigateTo({
		url: 'ClockInDetails'
	});
}
</script>
    