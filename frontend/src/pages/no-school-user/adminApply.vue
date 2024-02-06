<template>
  <el-form :model="form.content" label-width="10rem" id="apply-box">
    <el-form-item label="机构名称">
      <el-input v-model="form.content.name" :disabled="btnStatus" />
    </el-form-item>
    <el-form-item label="法定代表人">
      <el-input v-model="form.content.legalPerson" :disabled="btnStatus" />
    </el-form-item>
    <el-form-item label="法定代表人身份证" >
      <el-input v-model="form.content.legalPersonIdentityNo" :disabled="btnStatus" />
    </el-form-item>
    <el-form-item label="营业执照">
      <el-input v-model="form.content.businessLicense" :disabled="btnStatus" />
    </el-form-item>
    <el-form-item label="营业执照照片">
      <el-image class="photo shadow-box" :src="form.content.businessLicensePhoto1"
        v-show='businessLicensePhoto||btnStatus'  @click="photoChange1()"/>
      <div class="photo shadow-box" v-show='!businessLicensePhoto' v-if="!btnStatus">
        <FileUpload @success="onBusinessUpload" title="添加照片" ref="treeRef1"></FileUpload>
      </div>

    </el-form-item>
    <el-form-item label="申请人姓名">
      <el-input v-model="form.content.applicantName" :disabled="btnStatus" />
    </el-form-item>
    <el-form-item label="身份证号">
      <el-input v-model="form.content.applicantIdentityNo" :disabled="btnStatus" />
    </el-form-item>
    <el-form-item label="身份证照片">
      <el-image class="photo shadow-box" :src="form.content.applicantIdentityCardFrontsidePhoto1"
        v-show='frontsidePhoto||btnStatus' @click="photoChange2()"/>
      <div class="photo shadow-box" v-show='!frontsidePhoto'>
        <FileUpload @success="onFrontsideUpload" title="正面照片" ref="treeRef2"></FileUpload>
      </div>
      <el-image class="photo shadow-box" :src="form.content.applicantIdentityCardBacksidePhoto1"
        v-show='backsidePhoto||btnStatus'  @click="photoChange3()"/>
      <div class="photo shadow-box"  v-show='!backsidePhoto'>
        <FileUpload @success="onBacksideUpload" title="反面照片" ref="treeRef3"></FileUpload>
      </div>
    </el-form-item>
    <el-form-item class="submit">
      <el-button type="primary" :disabled="btnStatus" @click="onSubmit">{{submitValue}}</el-button>
    </el-form-item>
  </el-form>
</template>
  
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import useGlobal from '../../utils/useGlobal'
import FileUpload from '../../components/FileUpload.vue'
import { ElForm, ElInput, ElFormItem, ElButton, ElMessage } from 'element-plus'


const global = useGlobal()
// do not use same name with ref
const treeRef1 = ref(null)
const treeRef2 = ref(null)
const treeRef3 = ref(null)

const form = reactive({
  content: {
    name: '',
    legalPerson: '',
    legalPersonIdentityNo: '',
    businessLicense: '',
    applicantId: global.data.me.id,
    applicantName: '',
    applicantIdentityNo: '',
    businessLicensePhoto: '',
    applicantIdentityCardFrontsidePhoto: '',
    applicantIdentityCardBacksidePhoto: '',
    businessLicensePhoto1: '',
    applicantIdentityCardFrontsidePhoto1: '',
    applicantIdentityCardBacksidePhoto1: ''
  }
})
let businessLicensePhoto = ref(false)
let frontsidePhoto = ref(false)
let backsidePhoto = ref(false)

//如果同意请求
const onSubmit = async() => {
  console.log(form.content)
  if(form.content.name==''){
    ElMessage.closeAll()
    ElMessage.info('请填写学校名字')
    return
  }else if(form.content.legalPerson==''){
    ElMessage.closeAll()
    ElMessage.info('请填写法定代表人姓名')
    return
  }else if(form.content.legalPersonIdentityNo==''){
    ElMessage.closeAll()
    ElMessage.info('请填写法定代表人身份证号')
    return
  }else if(form.content.businessLicense==''){
    ElMessage.closeAll()
    ElMessage.info('请填写营业执照')
    return
  }else if(form.content.businessLicensePhoto==''){
    ElMessage.closeAll()
    ElMessage.info('请提交营业执照照片')
    return
  }else if(form.content.applicantName==''){
    ElMessage.closeAll()
    ElMessage.info('请填写申请人姓名')
    return
  }else if(form.content.applicantIdentityNo==''){
    ElMessage.closeAll()
    ElMessage.info('请填写申请人身份证')
    return
  }else if(form.content.applicantIdentityCardBacksidePhoto==''){
    ElMessage.info('请提交申请人身份证正面照片')
    return
  }else if(form.content.applicantIdentityCardFrontsidePhoto==''){
    ElMessage.closeAll()
    ElMessage.info('请提交申请人身份证反面照片')
    return
  }
  let result = await global.axios.post('/school-apply', {
    form: form.content
  })
  if(result.affectedRows==1){
    submitValue.value = '已申请'
    ElMessage.info('已申请')
    global.data.me.status = '审核中'
    btnStatus.value = true
  }

}
let submitValue = ref('申请')
let btnStatus = ref(false)


const onBusinessUpload = (file) => {
  form.content.businessLicensePhoto1 = global.filesBaseUrl + file
  form.content.businessLicensePhoto = file
  businessLicensePhoto.value = true
}
const onFrontsideUpload = (file) => {
  form.content.applicantIdentityCardFrontsidePhoto1 = global.filesBaseUrl + file
  form.content.applicantIdentityCardFrontsidePhoto = file
  frontsidePhoto.value = true
}
const onBacksideUpload = (file) => {
  form.content.applicantIdentityCardBacksidePhoto1 = global.filesBaseUrl + file
  form.content.applicantIdentityCardBacksidePhoto = file
  backsidePhoto.value = true
}
ElMessage.closeAll()
// 判断返回键是否出现
global.bus.emit('pageBack', 1)

function photoChange1(){
  if(btnStatus.value) return
  treeRef1.value.selectFile()
}
function photoChange2(){
  if(btnStatus.value) return
  treeRef2.value.selectFile()
}
function photoChange3(){
  if(btnStatus.value) return
  treeRef3.value.selectFile()
}

async function pageUpdate() {
  if (global.data.me.status == '审核中') {
    let school = await global.axios.get('/public/school-status', {
      params: {
        id: global.data.me.id
      }
    })
    if (school.status == '审核中') {
      submitValue.value = '已申请'
      btnStatus.value = true
      backsidePhoto.value = true
      businessLicensePhoto.value = true
      frontsidePhoto.value = true
      let result = await global.axios.get('/admin/detail', {
        params: {
          Id: global.data.me.id
        }
      })
      form.content = result
      form.content.applicantIdentityCardBacksidePhoto1 = global.filesBaseUrl + result.applicantIdentityCardBacksidePhoto
      form.content.applicantIdentityCardFrontsidePhoto1 = global.filesBaseUrl + result.applicantIdentityCardFrontsidePhoto
      form.content.businessLicensePhoto1 = global.filesBaseUrl + result.businessLicensePhoto

    }
  }

}
onMounted(() => {
  pageUpdate()
  updateBanner()
})
// 发送消息
function updateBanner() {
  global.bus.emit('key', {
    message: '您的申请在审核中，将在48小时内完成审核，或者在'
  })
}
</script>
  
<style scoped>
#apply-box .el-form-item__label{
  width: 10rem !important;
}
#apply-box {
  max-width: 57.143rem;
  width: 100%
}

.avatar-uploader .avatar {
  width: 12.714rem;
  height: 12.714rem;
  display: block;
}

.avatar-uploader2 .avatar {
  width: 11.286rem;
  height: 7.143rem;
  display: block;

}
.shadow-box{
  border: 1px solid lightgray;
  border-radius: .714rem;
}

.avatar-uploader2 {
  margin-right: 2.857rem !important;
  margin-bottom: 1.429rem !important;

}
</style>
<style scoped>
.avatar-uploader .el-upload {
  border: .071rem dashed var(--el-border-color);
  border-radius: .429rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 2rem;
  color: #8c939d;
  width: 20.071rem;
  height: 12.714rem;
  text-align: center;
}

.el-icon.avatar-uploader-icon2 {
  font-size: 2rem;
  color: #8c939d;
  width: 20.071rem;
  height: 12.714rem;
  text-align: center;
}

.avatar-uploader2 .el-upload {
  border: .071rem dashed var(--el-border-color);
  border-radius: .429rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader2 .el-upload:hover {
  border-color: var(--el-color-primary);
}

.photo {
  width: 20rem;
  height: 12.643rem;
  display: inline-block;
  margin-right: 1.429rem;
  margin-bottom: 1.429rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
  