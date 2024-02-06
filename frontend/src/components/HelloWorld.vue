<script setup>
import { ref } from 'vue'
import axios from 'axios'

defineProps({
  msg: String
})

const count = ref(0)
const message = ref('')

async function post() {
  message.value = (await axios.post('http://localhost/', {
    name: 'zhangsan',
    age: 20
  })).data
}

</script>

<template>
  <h1>{{ message }}</h1>
  <button @click="post">post</button>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
