



<template>
<!-- 机构管理 -->
  <view>
   
    <uni-card
      v-for="(item, index) in tableData.arr"
      :key="index"
      :title="item.name"
      :isFull="true"
      :sub-title="item.legalPerson"
      :extra="item.status"
      @tap="fm(index)"
    >
    
    </uni-card>

   
  </view>
<tab-bar pagePath="/pages/platform-admin/Administratorname"></tab-bar>
</template>



<script  setup>
import { reactive, onMounted } from "vue";
import useGlobal from "../../utils/useGlobal";

const global = useGlobal();

const tableData = reactive({
  arr: [
    {
      id: "",
      status: "",
      legalPerson: "",
      name: "",
   
    
    },
  ],
});

onMounted(() => {
  request();
});

async function request() {
  let e = await global.axios.get("/platform-admin/list");

  tableData.arr = e;
}
// 点击机构查看详情
// const formatDate = (date) => {
//   return new Date(tableData.arr[index].createTime).toLocaleString();
// };

let fm = (index) => {
 let id= tableData.arr[index].id

 uni.reLaunch({
	url: 'list?id='+id,

})

};




//删除
async function del(index) {
  let ms = await global.axios.post("/platform-admin/remove-school", {
    id: tableData.arr[index].id,
  });
}
</script>