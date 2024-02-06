<template>
    <!-- 顶部导航栏 -->
    <div class="header" id="top-nav">
        <div class="header-box">
            <div class="header-logo">
                <h2><span>IT人才孵化平台</span></h2>
            </div>
            <div class="header-nav" v-if="home">
                <div class="header-item" v-for="item,index in titleList">
                    <!-- 此部分为标题的相关，按照后期需要添加 -->
                    <span :class="titleIndex==index?'icon  actTitle':'icon'" @click="titleIndexChange(index,item)">
                        {{item.content}}
                    </span>
                </div>
            </div>
            <!-- 顶部导航栏内用户(已登录) -->
            <div class="header-user" @mouseleave="userOptionRemove" v-if="userStatus">
                <span class="user-img" @click="userOption">
                    {{firstName}}
                    <div class="user-option shadow-box" v-if="userOptVis">
                        <div class="user-info">个人信息</div>
                        <div class="user-logout" @click="logout">登出</div>
                    </div>
                </span>
                <span class="user-name">{{userName}}</span>
            </div>
            <!-- 顶部导航栏内用户（未登录） -->
            <div class="header-user" @mouseleave="userOptionRemove" v-if="!userStatus">
                <span class="login" @click="loginPath">登录 </span>
                / <span class="register" @click="registerPath"> 注册</span>
            </div>
        </div>

    </div>
</template>
<script setup>
import { onMounted, ref, reactive, onUnmounted, onUpdated, onBeforeUnmount } from 'vue'
import HtmlFontSizeChang from '../utils/adaptive'
import useGlobal from '../utils/useGlobal'

// 全局配置
let global = useGlobal()

let titleList = reactive([
    {
        'content': '首页',
        name: 'index'
    },
    {
        'content': '教育背景',
        name: 'index'
    },
    {
        'content': '加盟机构',
        name: 'index'
    },
    {
        'content': '新闻',
        name: 'index'
    },
    {
        'content': '加入我们',
        name: 'index'
    },
])
let home = ref(true)
let titleIndex = ref(0)
let userName = ref('')
let firstName = ref('')
let userOptVis = ref(false)
let userStatus = ref(false)


onMounted(() => {
    refresh()
})

// 网页加载判断事件
function refresh() {
    userOptVis.value = false
    if (global.data.me) {
        userName.value = global.data.me.name
        // 用户名
        firstName.value = userName.value.slice(0, 1)
        // 用户名的显示
        userStatus.value = true
        home.value = false
    } else {

    }
}

//标题点击事件
function titleIndexChange(index, item) {
    titleIndex.value = index
    global.router.push({
        name: item.name
    })
}
//用户信息显示事件
function userOption() {
    userOptVis.value = true
}
//用户信息消失事件
function userOptionRemove() {
    userOptVis.value = false
}
// 登出事件
function logout() {
    home.value = true
    userOptVis.value = false
    userStatus.value = false
    global.bus.emit('loginOutEvent', 1)
}
// 用户登录注册页面转换
function loginPath() {
    global.data.path = 'login'

    global.router.push({
        name: global.data.path
    })
}
function registerPath() {
    global.data.path = 'register'
    global.router.push({
        name: global.data.path
    })
}
</script>
