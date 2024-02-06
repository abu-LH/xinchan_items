<template>
    <div id="main" style="background-color:#fff;">
        <TopNavBar></TopNavBar>
        <div class="mainPage">
            <div class="first-page">
                <div class="box6">
                    <div class="text-title">
                        <div class="title">
                            IT人才孵化平台
                        </div>
                        <div class="text">
                            提供高效，快速的管理方案，再向前一步，便是成功。
                        </div>
                        <a @click="global.router.push('/register')">
                            <button class="section6-con">
                                免费申请
                            </button>
                        </a>
                    </div>
                    <div class="first-img">
                        <div class="img-box">
                            <img src="/img/one1.jpg" alt="" class="first">
                            <img src="/img/one2.jpg" alt="" class="second">
                            <img src="/img/one3.jpg" alt="" class="third">
                            <img src="/img/one4.jpg" alt="" class="fourth">
                            <img src="/img/one5.jpg" alt="" class="fifth">
                        </div>
                    </div>
                </div>

            </div>
            <div class="section2 section">
                <div class="title">产品优势</div>
                <div class="introduce">为什么选择IT人才孵化平台</div>
                <div class="section2-con">
                    <div class="item">
                        <div class="img-box"><img src="/img/icon1.jpg" alt=""></div>
                        <div class="img-title">班级/教师管理</div>
                        <p>
                            支持多学校加入 <br>
                            管理员/老师/学生多角色权限
                        </p>
                    </div>
                    <div class="item">
                        <div class="img-box"><img src="/img/icon2.jpg" alt=""></div>
                        <div class="img-title">全方位课程管理</div>
                        <p>
                            课程通知一键直达 <br>
                            支持布置课件/安排课程
                        </p>
                    </div>
                    <div class="item">
                        <div class="img-box"><img src="/img/icon3.jpg" alt=""></div>
                        <div class="img-title">在线批改/布置作业</div>
                        <p>
                            在线批改、评阅，多种打分方式 <br>
                            作业/课程推送
                        </p>
                    </div>
                    <div class="item">
                        <div class="img-box"><img src="/img/icon4.jpg" alt=""></div>
                        <div class="img-title">移动/pc随地办公</div>
                        <p>
                            随时随地均可办公 <br>
                            小程序/app/HTML5/QQ小程序均可办公
                        </p>
                    </div>
                </div>
            </div>
            <div class="section3 section">
                <div class="box">
                    <div class="title">产品功能</div>
                    <div class="introduce">IT人才孵化平台可以做什么</div>
                    <div class="section3-con section-box1">
                        <div class="left1"></div>
                        <div class="right1"></div>
                        <div class="detail">
                            <div class="left">
                                <div class="title">更高效的学校/班级管理</div>
                                <ul>
                                    <li>支持课件发放，学习资料提交，作业提交，管理更方便</li>
                                    <li>自定义班级，课程，流程更快捷</li>
                                    <li>老师/学生/管理员三权限，可以随时增添修改成员</li>
                                </ul>
                            </div>
                            <div class="right right0 ">
                                <img class="two1 shadow-box" src="/img/two1.jpg" alt="">
                                <img class="two2 shadow-box" src="/img/two2.jpg" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="section3-con section-box2">
                        <div class="left1"></div>
                        <div class="right1"></div>
                        <div class="detail">
                            <div class="right right2 ">
                                <img class="two1 shadow-box" src="/img/third1.jpg" alt="">
                                <img class="two3 shadow-box" src="/img/third2.jpg" alt="">
                            </div>
                            <div class="left">
                                <div class="title">课程周期全方位管理</div>
                                <ul>
                                    <li>推送最新信息，通知更快捷</li>
                                    <li>在线修改学生作业，提交课件，管理更方便</li>
                                    <li>自定义增删改查课程信息，提高办事效率</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                    <div class="section3-con section-box3">
                        <div class="left1"></div>
                        <div class="right1"></div>
                        <div class="detail">
                            <div class="left">
                                <div class="title">支持多端同时进行使用</div>
                                <ul>
                                    <li>小程序，app，安装，ios均可使用访问，提高适用性</li>
                                    <li>电脑办公，做完作业直接提交，简化办事流程</li>
                                    <li>随时随地处理消息，发布任务，办公方便化</li>
                                </ul>
                            </div>
                            <div class="right right3 ">
                                <img class="two5 shadow-box" src="/img/fourth2.jpg" alt="">
                                <img class="two4 shadow-box" src="/img/fourth1.jpg" alt="">
                                <img class="two6 shadow-box" src="/img/fourth3.jpg" alt="">
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <!-- <div class="section4 section">
                <div class="title">产品服务范围</div>
                <div class="introduce">手机，电脑两不误</div>
                <div class="section4-con">
                    我是具体内容
                </div>
            </div> -->
            <div class="section5 section">
                <div class="title">合作学校</div>
                <div class="introduce">有多少所学校在使用我们平台</div>
                <div class="section5-con">
                    <div class="school-box">
                        <span class="school-img" v-for="i in 12">
                            <img src="/img/school.png" alt="">
                        </span>
                    </div>
                </div>
            </div>
            <div class="section6 section">
                <div class="box6">
                    <div class="title">使用IT人才孵化平台</div>
                    <a @click="global.router.push('/register')">
                        <button class="section6-con">
                            加入我们
                        </button>
                    </a>
                </div>
            </div>
            <Footer></Footer>
        </div>
    </div>


</template>
<script setup>
import { onMounted, ref, onUnmounted, onUpdated, onBeforeUnmount } from 'vue'
import HtmlFontSizeChang from '../utils/adaptive'
import useGlobal from '../utils/useGlobal'
import TopNavBar from '../components/topNavBar.vue';
import Footer from '../components/footer.vue';
// 请求测试


// 全局配置
let global = useGlobal()

// 设置html的font-size
onMounted(async () => {
    //根据设备屏幕宽度适配font-size
    HtmlFontSizeChang(1600)
    // 登出页面接收
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
    console.log('页面加载')

})

onUpdated(() => {

})

onBeforeUnmount(() => {

    console.log('before销毁')
})
onUnmounted(() => {
    window.removeEventListener('scroll', scrollEvent)

    console.log('销毁')
})
// 窗体更新事件
// window.onresize = () => {
//     return (function () {
//         let contain = document.querySelector('.contain')
//         let docH = document.documentElement.clientHeight
//         console.log(docH)
//         contain.style.height = docH + 'px'
//     })()
// }

//设置具体按钮的点击事件

// logout事件
function logout(e) {
    // 页面重置
    global.data.me = null
    global.data.currentClassId = 0
    global.router.push({
        name: 'login'
    })
    console.log('登出')
}

// 主页加载的事件
let cTime = 10000;
let lTime = 0;
let navBol = true
let oneBol = true
let twoBol = true
let threeBol = true
let fourBol = true
let scrollEvent = () => {
    cTime = new Date()
    // 通过事件触发进行节流
    let oneTop = document.querySelector('.text').offsetTop+50
    let twoTop = document.querySelector('.section2 .introduce').offsetTop+100
    let threeTop = document.querySelector('.section-box1').offsetTop+100
    let fourTop = document.querySelector('.section-box2').offsetTop+100
    console.log(oneTop)
    if (cTime - lTime < 50) {
        return
    } else {
        lTime = cTime
        let sTop = document.documentElement.scrollTop

        if (sTop < 80 && !navBol) {
            let nav = document.getElementById('top-nav')
            nav.style.backgroundColor = 'rgba(0,0,0,0)'
            nav.classList.remove('shadow-box')
            navBol = true
        } else if (sTop > 80 && navBol) {
            let nav = document.getElementById('top-nav')
            nav.style.backgroundColor = 'white'
            nav.classList.add('shadow-box')
            navBol = false
        } else if (sTop > oneTop && oneBol){
            let one = document.querySelector('.section2-con')
            one.classList.add('active')
            oneBol = false
        } else if(sTop < oneTop && !oneBol){
            let one = document.querySelector('.section2-con')
            one.classList.remove('active')
            oneBol = true
        }
         else if (sTop > twoTop && twoBol){
            let two = document.querySelector('.right0')
            two.classList.add('right-active1')
            twoBol = false
         }else if(sTop < twoTop && !twoBol){
            let two = document.querySelector('.right0')
            two.classList.remove('right-active1')
            twoBol = true
        }
         else if (sTop > threeTop && threeBol){
            let three = document.querySelector('.right2')
            three.classList.add('right-active1')
            threeBol = false
         }else if(sTop < threeTop && !threeBol){
            let three = document.querySelector('.right2')
            three.classList.remove('right-active1')
            threeBol = true
        }
         else if (sTop > fourTop && fourBol){
            let four = document.querySelector('.right3')
            four.classList.add('right-active1')
            fourBol = false
        } else if(sTop < fourTop && !fourBol){
            let four = document.querySelector('.right3')
            four.classList.remove('right-active1')
            fourBol = true
        }
    }
}
window.addEventListener('scroll', scrollEvent)
</script>
 
<style scoped>
.white {
    background-color: #fff !important;
}

#main .header {
    background-color: rgba(0, 0, 0, 0);
    /* background-color: #fff; */
    color: black;
    position: fixed;
    top: 0;
    left: 0;
    transition: all .2s;
    z-index: 9999;
    border-radius: 0 0 1rem 1rem;
}

/* #main .header::after{
    content: '';
    display: block;
    clear: both;
} */
</style>
