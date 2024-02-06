<template>
  <view class="admin-box">
    <uni-list border-full>
      <uni-list-item clickable="true" v-for="item in adminRegisterList" @click="handleClick(item.Id)" :title="item.name"
        :note="'申请人: '+item.applicantName" :rightText="item.createTime" />
    </uni-list>
  </view>
  <tab-bar pagePath="/pages/platform-admin/adminRegisterList"></tab-bar>
</template>
<script setup>
import { onMounted, reactive } from 'vue'
import useGlobal from '../../utils/useGlobal'

const global = useGlobal()

//数据信息
var adminRegisterList = reactive([{
  name: '',
  legalPerson: '',
  businessLicense: '',
  applicantName: '',
  applicantIdentityNo: '',
  Id: ''
}])
let list = []
async function init() {
  let result = await global.axios.get('/register-admin/organization')
  result.forEach(ele => {
    // ele.createTime=ele.createTime.replace(/T/g,' ').replace(/.\d{3}[a-zA-Z]/g,' ')
    ele.createTime = new Date(ele.createTime).toLocaleString()
  });
  adminRegisterList.splice(0, 1, ...result)
}
onMounted(async function () {
  init()
})

function handleClick(id) {
  uni.navigateTo({
    url: "/pages/platform-admin/adminRegister?id=" + id
  })
}


</script>
<style scoped>
.el-table {
  height: 100% !important;
}
</style>