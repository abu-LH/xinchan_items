<template>
  <a class="file" v-for="fileInfo in fileInfos" :href="fileInfo.url" target="_blank">
    <div>
      <uni-tag size="normal" type="primary" circle="true" :text="fileInfo.name"></uni-tag>
      <div v-if="!readonly" class="close" @click.stop.prevent="a" @click="delFile(fileInfo.file)">×</div>
    </div>
  </a>
</template>

<script setup>
import useGlobal from '@/utils/useGlobal.js'    
import { onMounted, ref, toRefs, computed } from 'vue'

const global = useGlobal()

const props = defineProps({
  modelValue: String,
  readonly: Boolean
})
const {modelValue, readonly} = toRefs(props)

const emit = defineEmits(['update:modelValue'])

const fileInfos = computed(() => {
  if (!modelValue.value || modelValue.value === '') return []
  return modelValue.value.split('|').map(item => ({
    file: item,
    name: item.split('/').slice(-1)[0],
    url: global.filesBaseUrl + item
  }))
})

const addFile = (file) => {
  if (readonly.value) return

  let fileStr = modelValue.value.trim()
  console.log(modelValue.value)
  // 相同文件不再添加
  if (fileStr.split('|').indexOf(file) !== -1) return

  if (fileStr === '') {
    fileStr = file
  } else {
    fileStr += '|' + file
  }
  emit('update:modelValue', fileStr)
  // console.log(fileStr)
}

const delFile = (file) => {
  if (readonly.value) return
  
  let fileStr = modelValue.value.trim()
  let files = fileStr.split('|')
  let index = files.indexOf(file)
  if (index === -1) return

  files.splice(index, 1)
  fileStr = files.join('|')
  emit('update:modelValue', fileStr)
  // console.log(fileStr)              
}



defineExpose({
  addFile
})

</script>

<style lang="scss" scoped>
// .file:not(:first-child) {
//   margin-left: 0.5rem;
// }
.file {
  position: relative;
  display: inline-block;
  margin-top: 0.5rem;
  margin-left: 0.5rem;
  margin-bottom: 0.5rem;
  .uni-tag--circle {
	  border-radius: 3px !important;
  }
}

.close {
  color: #666;
  position: absolute;
  top: -0.43rem;
  right: 0rem;
}
</style>
