<template>
  <el-form :model="form.content" label-width="8.571rem" id="apply-box">
    <el-form-item label="申请人姓名">
      <el-input :disabled="btnStatus" v-model="form.content.name"  />
    </el-form-item>
    <el-form-item label="身份证号码">
      <el-input :disabled="btnStatus" v-model="form.content.id"  />
    </el-form-item>
    <el-form-item label="身份证照片">
      <el-image class="photo shadow-box" :src="form.content.applicantIdentityCardFrontsidePhoto1"
        v-show='frontsidePhoto' @click="photoChange2()" />
      <div class="photo shadow-box" v-show='!frontsidePhoto'>
        <FileUpload @success="onFrontsideUpload" title="正面照片" ref="treeRef2"></FileUpload>
      </div>
      <el-image class="photo shadow-box" :src="form.content.applicantIdentityCardBacksidePhoto1" v-show='backsidePhoto'
        @click="photoChange3()" />
      <div class="photo shadow-box" v-show='!backsidePhoto'>
        <FileUpload @success="onBacksideUpload" title="反面照片" ref="treeRef3"></FileUpload>
      </div>

    </el-form-item>
    <el-form-item class="submit">
      <el-button type="primary" :disabled="btnStatus" @click="onSubmit">{{submitBtn}}</el-button>
    </el-form-item>

  </el-form>
</template>

<script  setup>
import { reactive, ref, onMounted } from 'vue'
import useGlobal from '../../utils/useGlobal'
import { ElForm, ElInput, ElFormItem, ElButton, ElSelect, ElOption, ElMessageBox, ElMessage } from 'element-plus'
import FileUpload from '../../components/FileUpload.vue'
const global = useGlobal()
let frontsidePhoto = ref(false)
let backsidePhoto = ref(false)
const treeRef2 = ref(null)
const treeRef3 = ref(null)
let btnStatus = ref(false)
let submitBtn = ref('提交申请')
const form = reactive({
  content: {
    name: '',
    id: '',
    just: '',
    against: ''
  }
})
//正
const onFrontsideUpload = (file) => {
  form.content.applicantIdentityCardFrontsidePhoto1 = global.filesBaseUrl + file
  form.content.applicantIdentityCardFrontsidePhoto = file
  frontsidePhoto.value = true
}
//反
const onBacksideUpload = (file) => {
  form.content.applicantIdentityCardBacksidePhoto1 = global.filesBaseUrl + file
  form.content.applicantIdentityCardBacksidePhoto = file
  backsidePhoto.value = true
}
// 点击图片重新提交
function photoChange3() {
  if(btnStatus.value) return
  treeRef3.value.selectFile()
}
function photoChange2() {
  if(btnStatus.value) return
  treeRef2.value.selectFile()
}

// 提交申请
let onSubmit = async () => {
  if (form.content.name == '' ) {
    ElMessage.closeAll()
    ElMessage.info('请填写姓名')
    return
  }else if (  form.content.id == '' ) {
    ElMessage.closeAll()
    ElMessage.info('请填写身份证号')
    return
  }
  else if (  !form.content.applicantIdentityCardBacksidePhoto ) {
    ElMessage.closeAll()
    ElMessage.info('请提交身份证正面照片')
    return
  }else if (  !form.content.applicantIdentityCardFrontsidePhoto) {
    ElMessage.closeAll()
    ElMessage.info('请提交身份证反面照片')
    return
  }
  let e = await global.axios.post('/public/join-school', {
    id: global.data.me.id,
    schoolId: global.router.currentRoute.value.query.id,
    name: form.content.name,
    applicantIdentityNo: form.content.id,
    applicantIdentityCardBacksidePhoto: form.content.applicantIdentityCardBacksidePhoto,
    applicantIdentityCardFrontsidePhoto: form.content.applicantIdentityCardFrontsidePhoto
  })
  if (e.affectedRows === 1) {
    ElMessage.info('提交成功')
    submitBtn.value = '已提交申请'
    btnStatus.value = true
    global.bus.emit('key', {
      message: '您的申请在审核中，将在48小时内完成审核，或者在'
    })
  }



}

onMounted(() => {
  global.bus.emit('pageBack', 1)
  pageUpdate()
})
async function pageUpdate() {
  console.log(global.data.me.status)
  if (global.data.me.status == '审核中') {
    let result = await global.axios.get('/public/user-detail', {
      params: {
        id: global.data.me.id
      }
    })
    form.content.name = result.name
    form.content.id = result.identityNo
    form.content.applicantIdentityCardBacksidePhoto1 = global.filesBaseUrl + result.identityCardFrontsidePhoto
    form.content.applicantIdentityCardFrontsidePhoto1 = global.filesBaseUrl + result.identityCardBacksidePhoto
    frontsidePhoto.value = true
    backsidePhoto.value = true
    btnStatus.value = true
    submitBtn.value = '已提交申请'
    global.data.me.status = '审核中'
  }

}


</script>

<style scoped>
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

.shadow-box {
  border: 1px solid lightgray;
  border-radius: .714rem;
}
</style>
  