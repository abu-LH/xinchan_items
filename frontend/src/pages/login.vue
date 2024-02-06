<template>
    <div class="contain ">
        <TopNavBar></TopNavBar>
        <div class="content-un-login ">
            <div class="unLoginBox shadow-box scroll">
                <div class="content-login shadow-box">
                    <div class="contentLeft">用户登录</div>
                    <el-form label-position="right" label-width="100px" :model="userDetail" style="max-width: 300px"
                        class="contentRight">
                        <el-form-item class="positionRelative" label="*用户名">
                            <el-input :class="{'tip':userNameF}" v-model="userDetail.username" @blur="verifyUserName" />
                            <div class="tipValue" v-if="userNameF">用户名应为4~32位数字和字母组成</div>
                        </el-form-item>
                        <el-form-item label="*密码">
                            <el-input :class="{'tip':passwordF}" v-model="userDetail.password" @blur="verifyPassword"
                                type="password" />
                            <div class="tipValue" v-if="passwordF">密码应为6-32位</div>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onLogin">登录</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>




</template>
  
<script setup>
import useGlobal from '@/utils/useGlobal.js'
import { ref, onMounted, reactive, onUnmounted } from "vue"
import { ElForm, ElInput, ElFormItem, ElButton, ElSelect, ElOption, ElMessageBox, ElMessage } from 'element-plus'
import TopNavBar from '../components/topNavBar.vue';
import HtmlFontSizeChang from '../utils/adaptive'

const global = useGlobal()

let userNameF = ref(false)
let passwordF = ref(false)

const userDetail = reactive({
    username: '',
    password: '',
})
onMounted(() => {
    //根据设备屏幕宽度适配font-size
    HtmlFontSizeChang(1600)
})
let onLogin = async () => {
    verifyUserName()
    verifyPassword()
    if (userNameF.value || passwordF.value) return

    let result = await global.axios.post('/login', userDetail)

    global.data.me = result
    ElMessage.info('登录成功')
    global.bus.emit('updatePage', result)
    console.log('result' + result)
    console.log('global.data.me', global.data.me)
    if (result.status != '正常') {
        // global.router.replace(`/${global.data.me.roleType}`)
        global.router.replace({name:'applyfor'})
        return
    }
    global.router.replace('/' + global.data.me.roleType)
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
// 窗体更新事件
window.onresize = () => {
    return (function () {
        let contain = document.querySelector('.contain')
        let docH = document.documentElement.clientHeight
        contain.style.height = docH + 'px'
    })()
}

// 销毁函数
onUnmounted(() => {

})
</script>
  
<style scoped>
body {
    background-color: #fafafa !important;
}

.content-login {
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

