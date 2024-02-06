<template>
  <el-upload ref="upload" :show-file-list="false" :action="uploadUrl" :on-success="onSuccess" :on-error="onError">
    <template #trigger>
      <el-button ref="button" @click="onButtonClick">{{title || '选择上传文件'}}</el-button>
    </template>
  </el-upload>
</template>

<script setup>
import useGlobal from '@/utils/useGlobal.js'    
import { ElMessageBox } from 'element-plus';
import { onMounted, ref, toRefs } from 'vue'

const global = useGlobal()

const props = defineProps({
  title : String
})

const {title} = toRefs(props)

const emit = defineEmits(['success'])

const button = ref(null)
const upload = ref(null)
const uploadUrl = ref('')

onMounted(() => {
  uploadUrl.value = 'http://47.92.34.231:8000/file-upload'
})

const keydownlogin = () => {}

const onButtonClick = (event) => {
  // 确保按钮在点击后恢复非聚集的样式
  if (event && event.target) {
    event.target.blur()
    if (event.target.nodeName.toLowerCase() === 'span') {
      event.target.parentNode.blur()
    }
  }
}

const onSuccess = (response) => {
  console.log('emit', response)
  
  emit('success', response)
}

const onError = (error) => {
  console.log(error.message)
  if (error.message === '文件已存在，请勿重复上传') {
    ElMessageBox.alert(error.message)
    return
  }
  ElMessageBox.alert('文件上传失败')
}

// 触发选择文件的方法
const selectFile = () => {
  button.value.ref.click()
}

defineExpose({
  selectFile
})

</script>

<style scoped>
</style>
