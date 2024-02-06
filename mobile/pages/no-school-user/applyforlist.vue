<template>
  <view>
    <view class="box-bg">
				<uni-nav-bar shadow left-icon="left"  @click="onClick" leftText="返回"  />
			</view>
    <uni-section>
    
      <uni-list v-for="item in select.arr" :key="item.id">

        <uni-list-item  title="机构名称"  :rightText="item.name"></uni-list-item>
        <uni-list-item  title="机构ID"  :rightText="item.id"></uni-list-item>
        <uni-list-item  title="创建者" :rightText="item.legalPerson"></uni-list-item>

      </uni-list>
      <button @click="fbi">申请加入机构</button>
    </uni-section>
  </view>
 
</template>
<script setup>
import { reactive, ref } from "vue";
import useGlobal from "../../utils/useGlobal";
import { onShow, onLoad } from "@dcloudio/uni-app";
const global = useGlobal()

const select = reactive(
    {
        arr: []
    }
)
let ida = ref();
onLoad((e) => {
  ida.value = e.id
})
onShow(() => {
  request()
})


async function request() {
  let e = await global.axios.get("/public/search-detail", {
    params: {
      id: ida.value,
    },
  });
  select.arr = e;
console.log(e)

  


}
function onClick (e){
 select.arr=[]
  uni.reLaunch({
    url: "applyfor?id",
  });
 
}




// 申请加入机构
let fbi = () => {
    // global.router.push({
    //     name: 'Theadministrator',
    //     query: {
    //         id: form.detail.id
    //     }
    // })

    var id = global.data.me.id
    uni.reLaunch({
    url: "Theadministrator?id=" + id,

  })

}
</script>


    