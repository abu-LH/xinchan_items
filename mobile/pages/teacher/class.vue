<template>
    <view> 
	<uni-section title="课次查看" type="line">
		<uni-list>
			<uni-list-item v-for="(item,index) in tableData.arr" showArrow :title="item.name" link="redirectTo"  rightText="查看详情" @click="onClick(index)"/>
		</uni-list>
	</uni-section>
	<tab-bar pagePath="/pages/teacher/class"></tab-bar>
    </view>
    </template>
    
    <script  setup>
  
  import useGlobal from '../../utils/useGlobal'
  import { reactive, ref, onMounted} from 'vue';
  
  let page = getCurrentPages()
 console.log(page)

    const global=useGlobal()


    const input1 = ref()
    const input2 = ref()
    const input3 = ref()
    const tableData = reactive({
      arr:[],
    })
    global.bus.off('change') 

	
		
	function onClick(e){
		console.log(tableData.arr[e])
			uni.setStorage({
				key: '课程名称',
				data:tableData.arr[e],
				success: function () {
					console.log(tableData.arr[e])
				}
			})
			uni.navigateTo({
				url: 'classdir'
			});
	}
	
		onMounted(() => {
			onload()
			global.bus.on('change',onload)
			

		});

    
    //加载页面时加载的数据
   
  async  function onload(){
    let data=await global.axios.post("/teacher/Class",{id:global.data.currentClassId,id1:global.data.me.id})
      tableData.arr=data
      console.log(data)
    } 

    onload()

uni.$on('update',()=>{
	onload()
})
    
  
    </script>

    <style scoped>

      .add{
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 950px;
        position: absolute;
        top: 35%;
        left: 20%;

      }
      .add1{
        width: 100px;
      }

    </style>
    