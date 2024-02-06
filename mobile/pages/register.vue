<template>
    <view class="content-register">
        <form @submit="onRegister">
            <view class="uni-form-item uni-column">
                <view class="title">*用户名：</view>
                <input class="uni-input" v-model="userDetail.username" @blur="verifyUserName"
                    placeholder="4~32位数字和字母" />
            </view>
            <view v-if="userNameF" class="uni-form-item uni-column">
                <view class="title"></view>
                <view class="active">32位数字和字母</view>
            </view>
            <view class="uni-form-item uni-column">
                <view  class="title">*密码：</view>
                <input class="uni-input" v-model="userDetail.password" @blur="verifyPassword" placeholder="6-32位"
                    password />
            </view>
            <view v-if="passwordF" class="uni-form-item uni-column">
                <view class="title"></view>
                <view class="active">6-32位密码</view>
            </view>
            <view class="uni-form-item uni-column">
                <view  class="title">*确认密码：</view>
                <input class="uni-input" v-model="userDetail.password2" @blur="verifyPwd2" placeholder="再次输入密码"
                    password />
            </view>
            <view v-if="password2F" class="uni-form-item uni-column">
                <view class="title"></view>
                <view class="active">密码不一致</view>
            </view>
            <view class="uni-form-item uni-column">
                <view  class="title">*姓名：</view>
                <input class="uni-input" v-model="userDetail.name" @blur="verifyName" placeholder="" />
            </view>
            <view v-if="nameF" class="uni-form-item uni-column">
                <view class="title"></view>
                <view class="active">请输入姓名</view>
            </view>
            <view class="uni-form-item uni-column">
                <view  class="title">*性别：</view>
                <radio-group class="uni-list" @change="radioChange">
                    <label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in radioItems" :key="index">
                        <view>
                            <radio :id="item.name" :value="item.name" :checked="item.checked"></radio>
                        </view>
                        <view>
                            <label class="label-2-text" :for="item.name">
                                <text>{{item.value}}</text>
                            </label>
                        </view>
                    </label>
                </radio-group>
            </view>
            <view class="uni-form-item uni-column" label="*您的角色">
                <view  class="title">*您的角色：</view>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <view class="uni-list-cell-db">
                            <picker mode="selector" @change="roleChange" :value="index" :range="roleList">
                                <view class="uni-input">{{roleList[index]}}</view>
                            </picker>
                        </view>
                    </view>
                </view>
            </view>
            <view class="uni-form-item uni-column" label="手机号">
                <view  class="title">手机号：</view>
                <input class="uni-input" v-model="userDetail.phoneNum" />
            </view>
            <view class="uni-form-item uni-column" label="邮箱">
                <view  class="title">邮箱：</view>
                <input class="uni-input" v-model="userDetail.email" />
            </view>
            <view class="btn">
                <button type="primary" size="mini" form-type="submit">注册</button>
            </view>
            <view class="register">
                <span @click="navToRegister">登录</span>
            </view>
            <!-- <uni-popup ref="popup" type="message">
                <uni-popup-message :type="messageType" :message="message" :duration="1000"></uni-popup-message>
            </uni-popup> -->
        </form>
    </view>
</template>
  
<script setup>
import useGlobal from '@/utils/useGlobal.js'
import { ref, reactive } from "vue"


const global = useGlobal()
// const popup = ref()
// const message = ref('')
// let messageType = ref('error')
let userNameF = ref(false)
let passwordF = ref(false)
let password2F = ref(false)
let nameF = ref(false)
let data = ref(false)
const roleList = reactive(['学生', '老师', '管理员'])
const role = reactive(['student', 'teacher', 'admin'])
let index = ref(0)
const radioItems = reactive([{
    name: '男',
    value: '男',
    checked: 'true'
},
{
    name: '女',
    value: '女',
}
])
const userDetail = reactive({
    username: '',
    password: '',
    password2: '',
    name: '',
    gender: '男',
    roleType: 'student',
    phoneNum: '',
    email: '',
    role:'学生'
})
let onRegister = async () => {
    verifyPwd2()
    verifyUserName()
    verifyPassword()
    verifyName()
    verifyRole()
    if (userNameF.value || passwordF.value || password2F.value || nameF.value || data.value) return
    // return
    console.log('我是注册的调用')
    let result = await global.axios.post('/register', userDetail)
    global.data.me = result
    uni.navigateTo({
        url: '/pages/no-school-user/applyfor'
    })
}
function verifyPwd2() {
    if (userDetail.password != userDetail.password2) {
        password2F.value = true
        // message.value = '密码不一致'
        // messageType.value='error'
        // popup.value.open()
    }
    else password2F.value = false
}
function verifyRole() {
}
let verifyUserName = () => {
    const reg = /^[a-zA-Z0-9]{4,32}$/
    if (!(reg.test(userDetail.username))) userNameF.value = true
    else userNameF.value = false
}
let verifyPassword = () => {
    const reg = /^\w{6,32}$/
    if (!(reg.test(userDetail.password))) passwordF.value = true
    else passwordF.value = false
}
let verifyName = () => {
    if (userDetail.name == '') nameF.value = true
    else nameF.value = false
}

let navToRegister = () => {
    uni.navigateTo({
        url: "login"
    })
}

let radioChange = (evt) => {
    console.log(evt)
    userDetail.gender = evt.detail.value
}

let roleChange = (evt) => {
    console.log(evt)
    index.value = evt.detail.value
    userDetail.roleType = role[evt.detail.value]
    userDetail.role = roleList[evt.detail.value]
}
</script>
  
  
  
<style scoped>
.content-register {
    border-radius: .714rem;
    height: 100%;
    position: relative;
}

uni-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
}

.uni-form-item {
    display: flex;
}

.uni-form-item:not(:first-child) {
    margin-top: 20rpx;
}

.uni-form-item .uni-input {
    width: 400rpx;
    border-radius: 10rpx;
    height: 60rpx;
    line-height: 60rpx;
    flex: 1;
    background-color: #fff;
}

.uni-form-item .title {
    text-align: right;
    padding-right: 20rpx;
    width: 200rpx;
}

.btn {
    margin-top: 40rpx;
    display: flex;
    align-items: center;
}

.register {
    text-align: right;
}
.active{
    color: red;
}
.btn .uni-button {}
</style>

