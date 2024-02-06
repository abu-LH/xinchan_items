import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import { useStore } from './stores/default.js'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
// import locale from 'element-plus/lib/locale/lang/zh-cn'
import App from './App'
import axios from 'axios'
import mitt from 'mitt'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import tabbar from './components/tabBar'

export function createApp() {
	axios.defaults.baseURL = 'http://' + window.location.hostname + ':8000'
	// axios.defaults.baseURL = 'http://localhost:8000'
	// axios.defaults.baseURL = 'http://47.92.34.231:8000'
	console.log('axios.defaults.baseURL', axios.defaults.baseURL)

	function closeLoading() {
		uni.hideLoading()
	}

	// axios请求服务器端发生错误的处理
	function onAxiosError(error) {
		closeLoading()
		uni.showModal({
			title: '错误',
			content: '网络请求错误：' + error,
			showCancel: false
		})
		return Promise.reject({error})
	}

	// 请求拦截器
	axios.interceptors.request.use(function(config) {
		if (config.method.toLowerCase() === 'get') {
			console.log(config.method + '后端：', config.url, config.params)
		} else {
			console.log(config.method + '后端：', config.url, config.data)
		}
		uni.showLoading({
			title: '请求中…'
		})
		return config
	}, onAxiosError)

	// 响应拦截器
	axios.interceptors.response.use(function(response) {
		closeLoading()
		if (response.data.error) {
			console.log('后端报错：', response.data.error)
			uni.showModal({
				title: '错误',
				content: response.data.error.code || response.data.error,
				showCancel: false
			})
			return Promise.reject(response.data)
		}
		console.log('后端返回：', response.data)
		return response.data
	}, onAxiosError)

	const pinia = createPinia()
	pinia.use(piniaPluginPersistedstate)
	const app = createSSRApp(App)
	app.use(pinia)
	// app.use(ElementPlus, {
	// 	locale
	// })
	const data = useStore()
	
	// 全局变量设置
	app.config.globalProperties.data = data
	app.config.globalProperties.axios = axios
	app.config.globalProperties.bus = new mitt()
	app.config.globalProperties.backendBaseUrl = axios.defaults.baseURL
	app.config.globalProperties.frontendBaseUrl = window.origin
	app.config.globalProperties.filesBaseUrl = 'http://47.92.34.231/files/'
	app.component('tab-bar',tabbar)
	return {
		app
	}
}
