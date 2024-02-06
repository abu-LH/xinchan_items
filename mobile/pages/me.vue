<template>
    <view class="box">
        <button type="warn" class="item" @click="logout">登出</button>
    </view>
    <tab-bar pagePath="/pages/me"></tab-bar>
</template>
<script setup>
import useGlobal from '../utils/useGlobal'

const global = useGlobal()



let logout=()=>{
    global.data.me = null
    global.data.currentId = 0
    uni.navigateTo({
        url:"/pages/login"
    })
}
</script>
<style scoped>
.item{
    margin-top: 20rpx;
    border-bottom: 1px lightgray solid;
    height: 100rpx;
    line-height: 100rpx;
}
.box{
    padding: 20rpx;
}
</style>