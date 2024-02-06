<template>
    <form id="apply-box" @submit="onSubmit">
        <view class="uni-form-item uni-column">
            <view class="title">机构名称:</view>
            <input class="uni-input" v-model="form.content.name" :disabled="btnStatus" />
        </view>
        <view class="uni-form-item uni-column">
            <view class="title">法定代表人:</view>
            <input class="uni-input" v-model="form.content.legalPerson" :disabled="btnStatus" />
        </view>
        <view class="uni-form-item uni-column">

            <view class="title">法定代表人身份证:</view>
            <input class="uni-input" v-model="form.content.legalPersonIdentityNo" :disabled="btnStatus" />
        </view>
        <view class="uni-form-item uni-column">
            <view class="title">营业执照:</view>
            <input class="uni-input" v-model="form.content.businessLicense" :disabled="btnStatus" />
        </view>
        <view class="uni-form-item uni-column">
            <view class="title">营业执照照片:</view>
            <img class="photo shadow-box" :src="form.content.businessLicensePhoto1"
                v-show='businessLicensePhoto||btnStatus' @click="photoChange1()" />
            <view class="photo shadow-box" v-show='!businessLicensePhoto' v-if="!btnStatus">
                <FileUpload @success="onBusinessUpload" title="添加照片" ref="treeRef1"></FileUpload>
            </view>

        </view>
        <view class="uni-form-item uni-column">
            <view class="title">申请人姓名:</view>
            <input class="uni-input" v-model="form.content.applicantName" :disabled="btnStatus" />
        </view>
        <view class="uni-form-item uni-column">
            <view class="title">身份证号:</view>
            <input class="uni-input" v-model="form.content.applicantIdentityNo" :disabled="btnStatus" />
        </view>
        <view class="uni-form-item uni-column">
            <view class="title">身份证照片:</view>
            <img class="photo shadow-box" :src="form.content.applicantIdentityCardFrontsidePhoto1"
                v-show='frontsidePhoto||btnStatus' @click="photoChange2()" />
            <view class="photo shadow-box" v-show='!frontsidePhoto'>
                <FileUpload @success="onFrontsideUpload" title="正面照片" ref="treeRef2"></FileUpload>
            </view>
            <img class="photo shadow-box" :src="form.content.applicantIdentityCardBacksidePhoto1"
                v-show='backsidePhoto||btnStatus' @click="photoChange3()" />
            <view class="photo shadow-box" v-show='!backsidePhoto'>
                <FileUpload @success="onBacksideUpload" title="反面照片" ref="treeRef3"></FileUpload>
            </view>
        </view>
        <view class="submit">
            <button form-type="submit" type="primary" :disabled="btnStatus">{{submitValue}}</button>
        </view>
        <uni-popup ref="popup" type="message">
            <uni-popup-message type="error" :message="message" :duration="1000"></uni-popup-message>
        </uni-popup>
    </form>
    <tab-bar></tab-bar>
</template>
    
<script setup>
import { reactive, ref, onMounted } from 'vue'
import useGlobal from '../../utils/useGlobal'
import FileUpload from '../../components/FileUpload.vue'

const global = useGlobal()
// do not use same name with ref
let message = ref('消息弹框')
const popup = ref();


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
let submitValue = ref('申请')
let btnStatus = ref(false)

//如果同意请求
const onSubmit = async () => {
    console.log(form.content)
    if (form.content.name == '') {
        message.value = '请填写姓名'
        popup.value.open()
        return
    } else if (form.content.legalPerson == '') {
        message.value = '请填写法定代表人信息'
        popup.value.open()
        return
    } else if (form.content.legalPersonIdentityNo == '') {
        message.value = '请填写法定代表人身份证'
        popup.value.open()
        return
    } else if (form.content.businessLicense == '') {
        message.value = '请填写营业制造信息'
        popup.value.open()
        return
    } else if (form.content.businessLicensePhoto == '') {
        message.value = '请提交营业执照照片'
        popup.value.open()
        return
    } else if (form.content.applicantName == '') {
        message.value = '请填写申请人姓名'
        popup.value.open()
        return
    } else if (form.content.applicantIdentityNo == '') {
        message.value = '请填写申请人身份证号'
        popup.value.open()
        return
    } else if (form.content.applicantIdentityCardBacksidePhoto == '') {
        message.value = '请提交申请人身份证正面照片'
        popup.value.open()
        return
    } else if (form.content.applicantIdentityCardFrontsidePhoto == '') {
        message.value = '请提交申请人身份证反面照片'
        popup.value.open()
        return
    }
    let result = await global.axios.post('/school-apply', {
        form: form.content
    })
    if (result.affectedRows == 1) {
        submitValue.value = '已申请'
        // ElMessage.info('已申请')
        global.data.me.status = '审核中'
        btnStatus.value = true
    }

}


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
// 判断返回键是否出现
global.bus.emit('pageBack', 1)

function photoChange1() {
    if (btnStatus.value) return
    treeRef1.value.selectFile()
}
function photoChange2() {
    if (btnStatus.value) return
    treeRef2.value.selectFile()
}
function photoChange3() {
    if (btnStatus.value) return
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

}
</script>
    
<style scoped>
#apply-box .view__label {
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

.shadow-box {
    border: 1px solid lightgray;
    border-radius: .714rem;
}

.avatar-uploader2 {
    margin-right: 2.857rem !important;
    margin-bottom: 1.429rem !important;

}
</style>
<style scoped>
img {
    margin-top: 20rpx;
    font-size: 2rem;
    color: #8c939d;
    width: 500rpx;
    height: 350rpx;
    text-align: center;
    margin-left: 20rpx;
}

.uni-form-item {
    /* display: flex; */
}

.uni-form-item {
    margin-top: 20rpx;
}

.uni-form-item .uni-input {
    border-radius: 10rpx;
    height: 60rpx;
    margin: 0 auto;
    text-indent: 20rpx;
    /* flex: 1; */
    background-color: #fff;
}

.uni-form-item .title {
    padding-right: 20rpx;
    text-indent: 20rpx;

}

.btn {
    margin-top: 40rpx;
    display: flex;
    align-items: center;
}

.photo {
    margin-top: 20rpx;
    width: 500rpx;
    height: 350rpx;
    display: inline-block;
    margin-right: 1.429rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.photo:not(:first-child) {
    margin-bottom: 20rpx;
}
</style>
    