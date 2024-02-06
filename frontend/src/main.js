import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useStore } from './stores/default.js'
import router from './router/index.js'
import ElementPlus, {ElLoading, ElMessageBox} from 'element-plus'
import './element.css'
import './style.css'
import './index.css'
import App from './App.vue'
import axios from 'axios'
import mitt from 'mitt'
 
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
const app = createApp(App).use(pinia).use(router).use(ElementPlus)
const data = useStore()

// axios.defaults.baseURL = 'http://localhost:8000'
// axios.defaults.baseURL = 'http://47.92.34.231:8000'
const match = window.origin.match(/:\d/)
axios.defaults.baseURL = (match ? window.origin.substring(0, match.index) : window.origin) + ':8000'

let loading = null

function closeLoading() {
    if (loading) {
        loading.close()
        loading = null
    }
}

// axios请求服务器端发生错误的处理
function onAxiosError(error) {
    closeLoading()
    ElMessageBox.alert('网络请求错误：' + error)
    return Promise.reject({error})
}

// 请求拦截器
axios.interceptors.request.use(function(config) {
    if (config.method.toLowerCase() === 'get') {
        console.log(config.method + '后端：', config.url, config.params)
    } else {
        console.log(config.method + '后端：', config.url, config.data)
    }
    loading = ElLoading.service({
        lock: true,
        text: '请求中…',
        background: 'rgba(0, 0, 0, 0)',
    })
    return config
}, onAxiosError)

// 响应拦截器
axios.interceptors.response.use(function(response) {
    closeLoading()
    if (response.data.error) {
        console.log('后端报错：', response.data.error)
        ElMessageBox.alert(response.data.error)
        return Promise.reject(response.data)
    }
    console.log('后端返回：', response.data)
    return response.data
}, onAxiosError)

// 全局变量设置
app.config.globalProperties.data = data
app.config.globalProperties.router = router
app.config.globalProperties.axios = axios
app.config.globalProperties.bus = new mitt()
app.config.globalProperties.backendBaseUrl = axios.defaults.baseURL
app.config.globalProperties.frontendBaseUrl = window.origin
app.config.globalProperties.filesBaseUrl = 'http://47.92.34.231/files/'

app.mount('#app')

