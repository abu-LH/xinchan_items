<template>
<view> 
<form @submit="formSubmit" @reset="formReset">

<view class="box-bg">
				<uni-nav-bar shadow right-text="创建机构"   @clickRight="found"   />
			</view>
<uni-easyinput class="uni-mt-5" suffixIcon="search" v-model="input3" placeholder="搜索框" @iconClick="fn" ></uni-easyinput>
   <div v-if="bol">
    <uni-list  v-for=" (item,index) in  select.arr" :key="item.id" >
	    <uni-list-item :title="item.name" @tap="onClick(index)" link></uni-list-item>
    </uni-list>

  </div>
</form>


</view>
	
	<tab-bar></tab-bar>
</template>

   

<style scoped>
.uni-mt-5{
    margin-top: 30px;
}

</style>


<script  setup>
import { ref, reactive, onMounted } from 'vue'


import useGlobal from '../../utils/useGlobal'
const global = useGlobal()
let form = reactive(
    {
        detail: {
            id:'',
            name: '',
            legalPerson: '',
        }
    })

let    roleTypeStatus = ref(false)

// 控制显示
let bol = ref(true)
// 收集信息发送信息开始 a
const select = reactive(
    {
        arr: []
    }
)
const input3 = ref('')
// 点击搜索
async function fn() {
    if(input3.value === ''){
     return   alert('请重新输入内容')
    }
    else {

 
    let us = await global.axios.get('/search', {
        params: {
            value: input3.value
        }
    })
  
    select.arr = us
    bol.value = true
       }
   
}
// a结束
// 传参查看机构详情
function onClick (e){
 let id = select.arr[e].id;
 let i=id
  uni.reLaunch({
    url: "applyforlist?id=" + i,

  });
  console.log('传过来的'+i)
}

// 一开始显示一些机构
onMounted(() => {
    lis()
    if(global.data.me.roleType == 'admin'){
        roleTypeStatus.value = true
    }
})

async function lis() {
    let nn = await global.axios.get('/search', {
        params: {
            value: ''
        }
    })
    select.arr = nn
    console.log(nn)
}





onMounted(() => {
    lis()
    if(global.data.me.roleType == 'admin'){
        roleTypeStatus.value = true
    }
    
})


//创建机构

let found = () => {
     uni.reLaunch({
    url: "adminApply?id=" ,
  })


}

console.log(select)
// onMounted(() => {
//     global.bus.emit('pageBack', 1)
// })


</script>
  