import {getCurrentInstance} from 'vue'

export default function useGlobal() {
	const {appContext: {app: {config: {globalProperties}}}} = getCurrentInstance()
	
	return globalProperties
}

