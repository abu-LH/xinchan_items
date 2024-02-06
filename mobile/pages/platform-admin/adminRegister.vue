<template>
  <form @submit="onSubmit" >
    <view class="uni-form-item uni-column flex">
      <view class="title">机构名称：</view>
      <view class="item-detail">{{form.detail.name}}</view>
    </view>
    <view class="uni-form-item uni-column flex">
      <view class="title">法定代表人：</view>
      <view class="item-detail">{{form.detail.legalPerson}}</view>
    </view>
    <view class="uni-form-item uni-column flex">
      <view class="title">法定代表人身份证：</view>
      <view class="item-detail">{{form.detail.legalPersonIdentityNo}}</view>
    </view>
    <view class="uni-form-item uni-column flex">
      <view class="title">营业执照：</view>
      <view class="item-detail">{{form.detail.businessLicense}}</view>
    </view>
    <view class="uni-form-item uni-column" >
      <view class="title">营业执照：</view>
      <view class="photo-box">
        <image class="photo" :src="form.detail.businessLicensePhoto" />
      </view>
    </view>
    <view class="uni-form-item uni-column flex">
      <view class="title">申请人姓名：</view>
      <view class="item-detail">{{form.detail.applicantName}}</view>
    </view>
    <view class="uni-form-item uni-column flex">
      <view class="title">身份证号：</view>
      <view class="item-detail">{{form.detail.applicantIdentityNo}}</view>
    </view>
    <view class="uni-form-item uni-column">
      <view class="title">身份证照片：</view>
      <view class="photo-box">
        <image class="photo" :src="form.detail.applicantIdentityCardFrontsidePhoto" />
        <image class="photo" :src="form.detail.applicantIdentityCardBacksidePhoto" />
      </view>
    </view>
    <form-item class="submit">
      <button class="btn" type="primary" width="200px" form-type="submit" :disabled="btnStatus">{{submitValue}}</button>
      <button class="btn" @click="onReject" type="warn" :disabled="btnStatus">{{rejectValue}}</button>
    </form-item>
  </form>
  <tab-bar></tab-bar>
</template>
  
<script setup>
import { reactive, ref, onMounted } from 'vue'
import useGlobal from '../../utils/useGlobal'
import {
  onLoad,
} from '@dcloudio/uni-app'
const global = useGlobal()

let submitValue = ref('同意')
let rejectValue = ref('拒绝')
let btnStatus = ref(false)
//加载获取机构信息
let Id;
let column = ref(1)
let form = reactive(
  {
    detail: {
      name: '',
      legalPerson: '',
      legalPersonIdentityNo: '',
      businessLicense: '',
      applicantName: '',
      applicantIdentityNo: '',
      businessLicensePhoto: '',
      applicantIdentityCardFrontsidePhoto: '',
      applicantIdentityCardBacksidePhoto: '',
      applicantId: ''
    }
  })
onLoad(function (options) {
  Id = options.id
})
onMounted(async function () {
  form.detail = (await global.axios.get('/platform-admin/detail', {
    params: {
      Id: Id
    }
  }))
  form.detail.businessLicensePhoto = global.filesBaseUrl + form.detail.businessLicensePhoto
  form.detail.applicantIdentityCardFrontsidePhoto = global.filesBaseUrl + form.detail.applicantIdentityCardFrontsidePhoto
  form.detail.applicantIdentityCardBacksidePhoto = global.filesBaseUrl + form.detail.applicantIdentityCardBacksidePhoto
})
// do not use same name with ref

//同意请求
const onSubmit = async () => {
  let result = await global.axios.post('/platform-admin/agree', {
    // schoolId: Id, id: form.detail.applicantId
    schoolId: Id, id: form.detail.applicantId
  })
  if (result.error) {
  } else if (result.affectedRows === 1) {
    submitValue.value = '已同意'
    btnStatus.value = true
  }
  setTimeout(() => {
    global.router.replace({
      name: 'adminRegisterList'
    })
  }, 400);

}
//拒绝请求
const onReject = async () => {
  let result = await global.axios.post('/platform-admin/reject', {
    Id
  })
  if (result.error) {
  } else if (result.affectedRows === 1) {
    rejectValue.value = '已拒绝'
    btnStatus.value = true
  }
  setTimeout(() => {
    global.router.replace({
      name: 'adminRegisterList'
    })
  }, 400);
}

const imageUrl = ref('')

</script>
  
<style scoped>
.photo {
  width: 20rem;
  height: 12.643rem;
  display: inline-block;
  margin-right: 1.429rem;
  border-radius: 20rpx;
  background-color: #f3f3f3;
}
.photo:not(:first-child){
  margin-bottom: 20rpx;
}
.button {
  margin-bottom: 2.143rem !important;
}

.title {
  height: 60rpx;
  line-height: 60rpx;
  text-indent: 20rpx;
}
.flex{
  display: flex;
}

.item-detail {
  flex: 1;
  text-align: right;
  padding-right: 20rpx;
  height: 60rpx;
  line-height: 60rpx;
}

.photo-box {
  padding-left: 20rpx;
}
.submit{
  display: flex;
  justify-content:center;
}
.submit .btn{
  margin: 0 20rpx;
  width: 200rpx;
}
.uni-form-item.uni-column{
  margin-bottom: 20rpx;
  border-bottom: 1rpx solid lightgray;
}
</style>
  
  