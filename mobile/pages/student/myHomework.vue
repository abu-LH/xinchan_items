<template>
	<view>
	<classselector></classselector>
	<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" 
	styleType="button" activeColor="#4cd964">
	</uni-segmented-control>
	<view class="content">
		<view v-show="current === 0">
			<uni-collapse   v-model="accordionVal" @change="change">
				<uni-collapse-item v-for="(item,index) in tableData" :key="index" :title="item.updateTime">
					<view class="content" @click="goDetailsArena(item.classtimeId)" link>
						<FileList v-model="item.files" readonly></FileList>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view v-show="current === 1">
			<uni-collapse   v-model="accordionVal" @change="change">
				<uni-collapse-item v-for="(item,index) in submitted" :key="index" :title="item.updateTime">
					<view class="content" @click="goDetailsArena(item.classtimeId)" link>
						<FileList v-model="item.files" readonly></FileList>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view v-show="current === 2">
			<uni-collapse v-model="accordionVal" @change="change">
				<uni-collapse-item v-for="(item,index) in unpaid" :key="index" :title="item.updateTime">
					<view class="content" @click="goDetailsArena(item.classtimeId)" link>
						<FileList v-model="item.files" readonly></FileList>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
	</view>
	<tab-bar pagePath="/pages/student/myHomework"></tab-bar>
</template>

<script  setup>
	import useGlobal from '@/utils/useGlobal.js' 
	import { onShow } from '@dcloudio/uni-app'
	import { ref,   onMounted,onBeforeUnmount, onUnmounted} from 'vue' 
	import classselector from "../../components/ClassSelector.vue"
	import FileList from "../../components/FileList.vue"
	const global = useGlobal();
	

	let items= ['全部', '已交', '未交'];
	let current= ref(0);
	let accordionVal= ref('');
	let tableData = ref();
	let submitted = ref([]);
	let unpaid = ref([]);
    let notover = 0;   //未交
	     
	function onClickItem(e) {
	    if (current.value != e.currentIndex) {
			current.value = e.currentIndex;
		}
	};
	
	function change(e) {
		console.log(e);
	}

 
const activeName = ref('first')
 
function goDetailsArena(id) {
		uni.navigateTo({
			url:'homeworkDetails?id='+id
		
		});

	}
    onMounted(() => {
		query()
		 global.bus.on('change',query)
		 
		 global.bus.emit('key',                          //未交个数
		    JSON.stringify( { message : '你有'+notover+'条作业没交',
		            path:'/student/myHomework'})    
		        )
	})

 
// //获取学生作业 
let query = async () => {

    tableData.value = await global.axios.get('/student/homeworks', {
        params: {
             homeworkId: global.data.me.id,
            classid:global.data.currentClassId
        }
    })
   console.log(global.data.me.id); 
   console.log(global.data.currentClassId)
 
   let over = 0;
    tableData.value.forEach(element => {
        
       //转换时间格式
       element.updateTime=new Date(element.updateTime).toLocaleString()
       
        if (element.files) {
             
            over++             //已交
           submitted.value.push(element)          
           submitted.value.length=over 
               
        } else {
            notover++;                              
            unpaid.value.push(element) 
            unpaid.value.length=notover  //未交
        }
    });

    
}

</script>
<style lang="scss" scoped>
	
</style>
