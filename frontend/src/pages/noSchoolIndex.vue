<template>
    <div class="contain scroll ">
        <TopNavBar></TopNavBar>
        <!-- 顶部广告框 -->
        <div class="banner shadow-box" @click="bannerEvent" v-if="bannerStatus">
            <span>
                <img src="/img/icon/news.svg" class="banner-icon" />
                {{warning}}
            </span>
        </div>
        <div class="content-un-login scroll">
            <div class="unLoginBox shadow-box scroll">
                <el-button type="primary" id="backBtn" v-if="back" @click="goBack()">返回 </el-button>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script setup>
import TopNavBar from '../components/topNavBar.vue';
import HtmlFontSizeChang from '../utils/adaptive'
import { onMounted, ref, onUnmounted } from "vue"
import useGlobal from '@/utils/useGlobal.js'

const global = useGlobal()
let bannerStatus = ref(true)
let warning = ref('')

// 判断主页跳转
if (global.data.me && window.location.pathname == '/' && global.data.me.status == '正常') {
    global.router.replace({
        name: global.data.me.roleType
    })
} else if (global.data.me && window.location.pathname == '/' && global.data.me.status != '正常') {
    global.router.replace({
        name: 'applyfor'
    })
}
// 判断是否登录
if (global.data.me) {

} else {
    global.router.replace({
        name: 'index'
    })
}
let back = ref(false)

onMounted(async () => {
    //根据设备屏幕宽度适配font-size
    HtmlFontSizeChang(1600)
    // 广告框的判断
    if(global.data.me.status == '审核中'){
        warning.value = '您的申请正在审核中，请稍后'
    }else if(global.data.me.status == '拒绝'){
        warning.value = '您的申请被驳回，请检查您的申请重新提交'
    } else{
        warning.value = '您还未加入具体学校，请进行相关申请'
    }
    // 登出页面接收
    backChange()
    global.bus.on('loginOutEvent', logout)
    global.bus.on('pageBack', backChange)
})
onUnmounted(() => {
    global.bus.off('loginOutEvent', logout)
    global.bus.off('pageBack', backChange)
})
function goBack() {
    global.router.back()
}
function backChange() {
    if (window.location.pathname != '/no-school-user/applyfor') {
        back.value = true
    } else {
        back.value = false
    }
}
function logout(e) {
    // 页面重置
    global.data.me = null
    global.data.currentClassId = 0
    global.router.push({
        name: 'login'
    })
    console.log('登出')
}
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
.unLoginBox {
    position: relative;
}

#backBtn {
    position: absolute;
    top: 1.429rem;
    left: 2.143rem;
}
</style>