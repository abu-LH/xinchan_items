<template>
  <!-- 用户管理 -->
  <view>
    <uni-card
      v-for="(item, index) in tableData.arr"
      :key="index"
      :title="item.name"
      :isFull="true"
      :sub-title="item.role"
      :extra="item.schoolName"
      @click="fm(index)"
    >
    </uni-card>
  </view>
  	<tab-bar></tab-bar>
  
</template>
<style scoped>
</style>



 
<script setup>
import { reactive, onMounted } from "vue";

import useGlobal from "../../utils/useGlobal";
const global = useGlobal();

const tableData = reactive({
  arr: [
    {
      id: "",
      schoolId: "",
      schoolName: "",
      name: "",
      role: "",
      roleType: "",
      status: "",
      username: "",
      gender: "",
      phone: "",
      email: "",
    },
  ],
});

const dat = reactive({
  arr: [
    {
      createTime: "",
      updateTime: "",
    },
  ],
});
onMounted(() => {
  request();
});
// let now=[]
async function request() {
  let e = await global.axios.get("/platform-admin/admin");

  tableData.arr = e;
  // 获取某一属性
  // e.forEach(element => {
  //   now.push(element.createTime)
  // });
}
let fm = (index) => {
  let id = tableData.arr[index].id;
  uni.reLaunch({
    url: "indexlist?id=" + id,
  });
};
//删除
// async function del(e){
// let ms = await global.axios.post('/platform-admin/remove-user',{

//     id:tableData.arr[e].id

// })
// tableData.arr.splice(tableData.arr[e],1)

// }



</script>





