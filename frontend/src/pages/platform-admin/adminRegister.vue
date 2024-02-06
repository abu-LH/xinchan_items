<template>
    <el-form  label-width="8.571rem" >
      <el-descriptions
      :column="column"
      border
    >
        <el-descriptions-item label="机构名称">{{form.detail.name}}</el-descriptions-item>
        <el-descriptions-item label="法定代表人">{{form.detail.legalPerson}}</el-descriptions-item>
        <el-descriptions-item label="法定代表人身份证">{{form.detail.legalPersonIdentityNo}}</el-descriptions-item>
        <el-descriptions-item label="营业执照">{{form.detail.businessLicense}}</el-descriptions-item>
        <el-descriptions-item label="营业执照">
          <el-image class="photo" :src="form.detail.businessLicensePhoto" />
        </el-descriptions-item>
        <el-descriptions-item label="申请人姓名" >{{form.detail.applicantName}}</el-descriptions-item>
        <el-descriptions-item label="身份证号" >{{form.detail.applicantIdentityNo}}</el-descriptions-item>
        <el-descriptions-item label="身份证照片" >
          <el-image class="photo" :src="form.detail.applicantIdentityCardFrontsidePhoto" />
          <el-image class="photo" :src="form.detail.applicantIdentityCardBacksidePhoto" />
        </el-descriptions-item>
    </el-descriptions>
      <el-form-item class="submit">
        <el-button type="primary" @click="onSubmit" :disabled="btnStatus">{{submitValue}}</el-button>
        <el-button @click="onReject" :disabled="btnStatus">{{rejectValue}}</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { reactive,ref,onMounted } from 'vue'
  import useGlobal from '../../utils/useGlobal'
  
  const global = useGlobal()

  let submitValue = ref('同意')
  let rejectValue = ref('拒绝')
  let btnStatus = ref(false)
  //加载获取机构信息
  let Id;
  let column = ref(1)
  let form = reactive(
    {
      detail:{
      name: '',
      legalPerson: '',
      legalPersonIdentityNo: '',
      businessLicense: '',
      applicantName: '',
      applicantIdentityNo: '',
      businessLicensePhoto:'',
      applicantIdentityCardFrontsidePhoto:'',
      applicantIdentityCardBacksidePhoto:'',
      applicantId:''
    }
  })
  onMounted(async function(){
    Id = global.router.currentRoute.value.query.Id
    form.detail= (await global.axios.get('/platform-admin/detail',{
      params:{
        Id:Id
      }
    }))
    form.detail.businessLicensePhoto  = global.filesBaseUrl + form.detail.businessLicensePhoto
    form.detail.applicantIdentityCardFrontsidePhoto  = global.filesBaseUrl + form.detail.applicantIdentityCardFrontsidePhoto
    form.detail.applicantIdentityCardBacksidePhoto  = global.filesBaseUrl + form.detail.applicantIdentityCardBacksidePhoto
    console.log(form.detail)
  })
  // do not use same name with ref

  //同意请求
  const onSubmit = async () => {
    let result = await global.axios.post('/platform-admin/agree',{
      schoolId:Id,id:form.detail.applicantId
    })
    if(result.error){
      console.log(result.error)
    }else if(result.affectedRows===1){
      submitValue.value = '已同意'
      btnStatus.value = true
    }
    setTimeout(() => {
      global.router.replace({
        name:'adminRegisterList'
      })
    }, 400);
    
  }
  //拒绝请求
  const onReject = async() =>{
    let result = await global.axios.post('/platform-admin/reject',{
      Id
    })
    if(result.error){
      console.log(result.error)
    }else if(result.affectedRows===1){
      rejectValue.value = '已拒绝'
      btnStatus.value = true
    }
    setTimeout(() => {
      global.router.replace({
        name:'adminRegisterList'
      })
    }, 400);
  }
  
  const imageUrl = ref('')
 
  </script>
  
  <style scoped>
  
  .photo{
    width: 20rem;
    height: 12.643rem;
    display: inline-block; 
    margin-right: 1.429rem;
    margin-bottom: 1.429rem;
  }
  .el-button{
    margin-bottom: 2.143rem!important;
  }
  </style>
  
  