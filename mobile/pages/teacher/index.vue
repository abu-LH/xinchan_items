<template>
  <view>
	  <view>
	  	<classselector></classselector>
	  </view>
		<uni-section title="学生列表" type="line">
			<uni-list border-full v-for="item in tableData.arr">
				<uni-list-item :title="item.name" :note="'性别: '+item.gender" :rightText="item.createTime" />
			</uni-list>
		</uni-section>
		<tab-bar pagePath="/pages/teacher/index"></tab-bar>
  </view>
</template>
    
<script  setup>
import useGlobal from "../../utils/useGlobal";
import { reactive ,onMounted} from "vue";
import classselector from "../../components/ClassSelector.vue"


const global = useGlobal();

const tableData = reactive({
  arr: [],
});
global.bus.off("Change");

onMounted(() => {
	load()
	global.bus.on('change',load)
});


async function load() {

	console.log( global.data.currentClassId)
  let data = await global.axios.post(`/teacher/student`, {
    id: global.data.currentClassId,
  });

  tableData.arr = data.filter(item=>item.createTime=new Date(item.createTime).toLocaleString());
     console.log(tableData.arr)
}

load();
</script>
    