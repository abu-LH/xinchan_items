<template>
  <div>
    <span style="color:black;font-size:20px;" empty-text="没有啦">打卡记录</span>
    <!--表单-->
    <el-table :data="filterTableData" style="width: 100%">
      <el-table-column label="地址" prop="name" width="auto" />
      <el-table-column prop="createTime" label="早上" :formatter="formatData" width="auto" />
      <el-table-column prop="updateTime" label="晚上" :formatter="formatData" width="auto" />
      <el-table-column prop="state" label="状态"  width="auto" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="请输入过滤" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
  
<script lang="ts" setup>

import { reactive, computed, ref, onMounted } from 'vue'
import useGlobal from '../../utils/useGlobal';

const global = useGlobal()

global.bus.off('classChange')

global.bus.on('classChange', index => {
  insert()
})

function formatData(row, column, cellValue, index) {

  var s = new Date(cellValue).toLocaleString();
  return s;

}


const search = ref('')
onMounted(()=>{
  insert()
})


const filterTableData = computed(() =>
  tableData.arr.filter(
    (data) =>
      !search.value ||
      data.createTime.toLowerCase().includes(search.value.toLowerCase()) ||
      data.name.toLowerCase().includes(search.value.toLowerCase()) ||
      data.state.toLowerCase().includes(search.value.toLowerCase()) ||
      data.updateTime.toLowerCase().includes(search.value.toLowerCase()) 
  )
)


const tableData = reactive({
  arr: []
})
async function insert() {
  let data = await global.axios.get('/student/getclock', {
    params: {
      userid: global.data.me.id,
      classid: global.data.currentClassId,
      schoolId: 1
    }
  })
 
  tableData.arr = data.filter(item => item.createTime = new Date(item.createTime).toLocaleString());
}




</script>
   