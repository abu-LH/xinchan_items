<template>
    <div class="contain scroll ">
        <TopNavBar></TopNavBar>

        <!-- 顶部广告框 -->
        <div class="banner shadow-box" @click="bannerEvent" v-if="!bannerBol">
            <span >
                <img src="/img/icon/news.svg" class="banner-icon" />
            </span>
            <ul>
                <li v-for="item,index in bannerList" @click="bannerPathTo(item.path)">{{item.message}}</li>
            </ul>
        </div>
        <!-- 班级列表 -->
        <div class="classList shadow-box" v-if="classStatus">
            <div v-for="item,index in roleClass.detail"
                :class="classIndex==index?'classId shadow-box class-act':'classId shadow-box '"
                @click="changeClass(index)">
                {{item.className}}
                <span @click="removeClass(index)" v-if="global.data.me.roleType=='teacher'">×</span>
            </div>
            <div class="add-class" circle>+</div>
        </div>
        <!-- 内容详情页(已登录状态) 包括了左边导航栏和右边内容显示栏 -->
        <div class="content scroll" v-if="!home">
            <!-- 左边导航栏 -->
            <div class="left-cont">
                <div class="list scroll shadow-box">
                    <div class="item " v-for="item,index in navList">
                        <div :class="navIndex==index?'item-cont scale act':'item-cont scale'" @click="changeAct(index)">
                            {{item.title}}
                        </div>
                    </div>
                </div>
            </div>
            <!-- 右边导航栏 -->
            <div class="right-cont">
                <div class="right-box scroll shadow-box">
                    <div class="detail">
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script setup>
import { onMounted, ref, reactive, onUnmounted, onUpdated, onBeforeUnmount } from 'vue'
import HtmlFontSizeChang from '../utils/adaptive'
import useGlobal from '../utils/useGlobal'
import TopNavBar from '../components/topNavBar.vue';
import { ElMessage } from 'element-plus';
// 请求测试


// 全局配置
let global = useGlobal()
//页面加载之前的主页判定
let home = ref(true)
let userStatus = ref(false)

//判定角色，分配主页
let user = ref(0)
let bannerList = reactive({
    detail:[]
})
let navList = reactive([]);
let roleClass = reactive({
})

//banner配置
let warning = ref('')
let bannerStatus = ref(false)
let classStatus = ref(false)
let bannerDefault = ref('您完成了所有项目')
let complete = ref(false)
let bannerBol = ref(true)
// 基本配置
let navIndex = ref(0)
let classIndex = ref(0)
// 加载前判断是否登录，然后加载页面
dataUpdate()

// 设置html的font-size
onMounted(async () => {
    //根据设备屏幕宽度适配font-size
    HtmlFontSizeChang(1600)
    // 路由判断
    if (global.data.me && window.location.pathname == '/' && global.data.me.status == '正常') {
        global.router.replace({
            name: global.data.me.roleType
        })
    } else if (global.data.me && window.location.pathname == '/' && global.data.me.status != '正常') {
        global.router.replace({
            name: 'applyfor'
        })
    }
    global.bus.on('loginOutEvent', logout)
    // 判断是否存在消息，只进行一次接收
    console.log('页面加载完成')
    global.bus.on('key', bannerBox)
})

onUpdated(() => {
})

onBeforeUnmount(() => {

    console.log('before销毁')
})
onUnmounted(() => {
    console.log('销毁')
})
// 窗体更新事件
window.onresize = () => {
    return (function () {
        let contain = document.querySelector('.contain')
        let docH = document.documentElement.clientHeight
        contain.style.height = docH + 'px'
    })()
}
// 主页消息提示
function bannerBox(val) {
    // 用户名的显示
    bannerBol.value = false
    bannerList[val.key]=val
    console.log(bannerList)

}
// 
function bannerPathTo(path){
    let pathList = path.split('/')
    let index = navList.findIndex(item => item.path == pathList[2])
    navIndex.value = index
    global.router.push(path)
}



// 判断主页框架
function dataUpdate() {
    if (!global.data.me) {
        global.router.replace({
            name: 'index'
        })
    } else {
        // 跳转用户应到主页，以及更新左边列表资料
        // 判断banner显示
        user.value = global.data.me.roleType
        // 判断是否加入机构
        if (global.data.me.status == '正常') {
            // 加入机构成员主页
            // 框架显示
            home.value = false
            // 导航栏显示
            getNav()
            if (global.data.me.roleType == 'teacher' || global.data.me.roleType == 'student') {
                // 班级请求
                classIdGet()
                // 班级显示
                classStatus.value = true
            }
        } else {
            // 未加入机构成员主页

        }

    }
}
// 更新左边导航数据
async function getNav() {
    let navArray = (await import('../router/' + user.value + '.js')).default
    navList.length = 0
    navArray.forEach(item => {
        if (item.title) {
            navList.push(item)
        }
    })
    navIndexControl()
}
// path 与 nav sidebar匹配
function navIndexControl() {
    let path = window.location.pathname.split('/')
    let index = navList.findIndex(item => item.path == path[2])
    navIndex.value = index
}
// 获取class信息
async function classIdGet() {
    let result = await global.axios.get('/public/class-id', {
        params: {
            id: global.data.me.id
        }
    })
    roleClass.detail = result
    // class标题的归属判断
    let index = 0
    if (global.data.currentClassId == 0) {
        global.data.currentClassId = result[index].classId
    } else {
        index = result.findIndex(item => item.classId == global.data.currentClassId)

    }
    classIndex.value = index
    global.bus.emit('classChange', roleClass.detail[classIndex.value].classId)

}
//设置具体按钮的点击事件
//左边导航栏点击事件
function changeAct(index) {
    navIndex.value = index
    global.data.pageIndex = index
    global.router.replace({
        name: navList[index].name
    })
}


//班级删除事件
function removeClass(index) {
    if(global.data.me.roleType =="student") {
        return
    }
    roleClass.detail.splice(index, 1)
}
//切换班级事件
async function changeClass(index) {
    classIndex.value = index
    global.data.currentClassId = roleClass.detail[classIndex.value].classId
    global.bus.emit('classChange', roleClass.detail[classIndex.value].classId)
}


//消息点击到指定页面
function bannerEvent() {

}

// logout事件
function logout(e) {
    // 页面重置
    global.data.me = null
    global.data.currentClassId = 0
    home.value = true
    userStatus.value = false
    localStorage.setItem('me', null)
    bannerStatus.status = false
    user.value = ''
    warning.value = ''
    classStatus.value = false
    complete.value = true
    global.router.push({
        name: 'login'
    })
    console.log('登出')
}
</script>
 
