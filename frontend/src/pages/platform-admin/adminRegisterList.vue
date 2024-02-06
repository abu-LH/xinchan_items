<template>
  <el-table :data="adminRegisterList" style="width: 100%">
    <el-table-column fixed prop="name" label="机构名称"/>
    <el-table-column prop="legalPerson" label="法定代表人"  width="120"/>
    <el-table-column prop="businessLicense" label="营业执照"  />
    <el-table-column prop="applicantName" label="申请人姓名"  width="120" />
    <el-table-column prop="applicantIdentityNo" label="申请人身份证号"  />
    <el-table-column prop="createTime" label="申请时间"  />
    <el-table-column fixed="right" label="详情"  type=index size="large" width="120" >
      <template #default="data">
        <el-button link type="primary" size="small" @click="handleClick(data.$index)"
          >详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import {onMounted,reactive} from 'vue'
import useGlobal from '../../utils/useGlobal'

const global = useGlobal()

//数据信息
var adminRegisterList = reactive([{
  name:'',
  legalPerson:'',
  businessLicense:'',
  applicantName:'',
  applicantIdentityNo:'',
  Id:''
}])
let list = []
async function init(){
  let result = await global.axios.get('/register-admin/organization')
  result.forEach(ele => {
    // ele.createTime=ele.createTime.replace(/T/g,' ').replace(/.\d{3}[a-zA-Z]/g,' ')
    ele.createTime=new Date(ele.createTime).toLocaleString()
  });
  adminRegisterList.splice(0,1,...result)
}
onMounted(async function(){
  init()
})

function handleClick(index){
  let Id = adminRegisterList[index].Id
  global.router.push({
      name : 'adminRegister',
      query:{
          Id : Id
      }
  })
}


</script>
<style scoped>
.el-table{
  height: 100% !important;
}

</style>