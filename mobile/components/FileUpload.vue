<template>
  <button ref="button" type="primary" plain="true" @click="onButtonClick">{{title || '选择上传文件'}}</button>
</template>

<script setup>
import useGlobal from '@/utils/useGlobal.js'    
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

const uploadFile = (filePath) => {
  uni.uploadFile({
    url: uploadUrl.value,
    filePath: filePath,
    name: 'file',
    success: (res) => {
      console.log('uploadFile success', res.data)
	  onSuccess(res)
    }
  })
}

const onButtonClick = (event) => {
// #ifdef H5
  uni.chooseFile({
    count: 1,
    success: function (res) {
      console.log('chooseFile success', res)
      uploadFile(res.tempFilePaths[0])
    }
  })
// #endif
// #ifdef MP-WEIXIN || MP-QQ
  uni.chooseMessageFile({
    count: 1,
    success: function (res) {
      console.log('chooseMessageFile success', res)
      uploadFile(res.tempFilePaths[0])
    }
  })
// #endif
// #ifndef H5 || MP-WEIXIN || MP-QQ
  uni.chooseImage({
    count: 1,
    success: function (res) {
      console.log('chooseImage success', res)
      uploadFile(res.tempFilePaths[0])
    }
  })
// #endif
}

const onSuccess = (response) => {
  emit('success', response.data)
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
