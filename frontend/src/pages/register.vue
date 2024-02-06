<template>
    <div class="contain scroll ">
        <TopNavBar></TopNavBar>
        <div class="content-un-login ">
            <div class="unLoginBox shadow-box scroll">
                <div class="content-register1 shadow-box">
                    <div class="contentLeft">用户注册</div>
                    <el-form label-position="right" label-width="100px" :model="userDetail" style="max-width: 300px"
                        class="contentRight">
                        <el-form-item class="positionRelative" label="*用户名">
                            <el-input :class="{'tip':userNameF}" v-model="userDetail.username" @blur="verifyUserName"
                                :placeholder="userNameTip" />
                            <div class="tipValue" v-if="userNameF">用户名应为4~32位数字和字母组成</div>

                        </el-form-item>
                        <el-form-item label="*密码">
                            <el-input :class="{'tip':passwordF}" v-model="userDetail.password" @blur="verifyPassword"
                                :placeholder="pwdTip" type="password" />
                            <div class="tipValue" v-if="passwordF">密码应为6-32位</div>
                        </el-form-item>
                        <el-form-item label="*确认密码">
                            <el-input :class="{'tip':password2F}" v-model="userDetail.password2" @blur="verifyPwd2"
                                :placeholder="pwd2Tip" type="password" />
                            <div class="tipValue" v-if="password2F">密码不一致</div>
                        </el-form-item>
                        <el-form-item label="*姓名">
                            <el-input :class="{'tip':nameF}" v-model="userDetail.name" @blur="verifyName"
                                :placeholder="nameTip" />
                            <div class="tipValue" v-if="nameF">请填写姓名</div>
                        </el-form-item>
                        <el-form-item label="*性别">
                            <el-select v-model="userDetail.gender">
                                <el-option label="男" value="男" />
                                <el-option label="女" value="女" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="*您的角色">
                            <el-select v-model="userDetail.personRole">
                                <el-option label="机构管理者" value="admin|管理员" />
                                <el-option label="老师" value="teacher|教师" />
                                <el-option label="学生" value="student|学生" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="手机号">
                            <el-input v-model="userDetail.phoneNum" />
                        </el-form-item>
                        <el-form-item label="邮箱">
                            <el-input v-model="userDetail.email" />
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onRegister">注册</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
import useGlobal from '@/utils/useGlobal.js'
import { ref, onMounted, reactive } from "vue"
import { ElForm, ElInput, ElFormItem, ElButton, ElSelect, ElOption, ElMessage } from 'element-plus'
import TopNavBar from '../components/topNavBar.vue';
import HtmlFontSizeChang from '../utils/adaptive'


const global = useGlobal()

let userNameF = ref(false)
let passwordF = ref(false)
let password2F = ref(false)
let nameF = ref(false)
let data = ref(false)
let nameTip = ref('请填写姓名')
let userNameTip = ref('4~32位数字和字母')
let pwdTip = ref('6-32位密码')
let pwd2Tip = ref('再次输入密码')
const userDetail = reactive({
    username: '',
    password: '',
    password2: '',
    name: '',
    gender: '男',
    personRole: 'student|学生',
    phoneNum: '',
    email: '',
})
let onRegister = async () => {
    verifyPwd2()
    verifyUserName()
    verifyPassword()
    verifyName()
    verifyRole()
    if (userNameF.value || passwordF.value || password2F.value || nameF.value||data.value) return
    let roleList = userDetail.personRole.split("|")
    userDetail.role = roleList[1]
    userDetail.roleType = roleList[0]
    
    // return
    let result = await global.axios.post('/register', userDetail)
    global.data.me = result
    ElMessage.info('注册成功')
    global.router.replace({name:'applyfor'})
}
function verifyPwd2() {
    if (userDetail.password != userDetail.password2) password2F.value = true
    else password2F.value = false
}
function verifyRole(){
    if(userDetail.personRole==undefined) ElMessage.info('输入角色信息'),data.value=true
    else data.value=false
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
onMounted(() => {
    //根据设备屏幕宽度适配font-size
    HtmlFontSizeChang(1600)
})
// 窗体更新事件
window.onresize = () => {
    return (function () {
        let contain = document.querySelector('.contain')
        let docH = document.documentElement.clientHeight
        contain.style.height = docH + 'px'
    })()
}
</script>
  
  
  
<style scoped>
.content-register1 {
    border-radius: .714rem;
    width: 400px;
    background-color: #fff;
    margin: 150px auto;
    padding: 20px;
    display: flex;
    justify-content: space-between;
}

.positionRelative {
    position: relative;
}


.main {
    color: red;
    font-size: 12px;
}

.tipValue {
    position: absolute;
    color: red;
    font-size: 12px;
    transform: scale(0.75) translateY(100%) translateX(-49%);
    width: 200%;
    bottom: 0;
    left: 50%;

}
</style>

