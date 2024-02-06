<template>
  <div>
    <span style="color: black; font-size: 20px">学生列表</span>

    <el-table
      :data="tableData.arr"
      empty-text="没有啦"
      border
      style="width: 100%"
    >
      <el-table-column prop="createTime" :formatter="formatData" label="日期" />
      <el-table-column prop="name" label="姓名" width="300" />
      <el-table-column prop="gender" label="性别" width="300" />
    </el-table>

  </div>
</template>
    
<script  setup>
import useGlobal from "../../utils/useGlobal";
import FileList from "@/components/FileList.vue";
import { reactive } from "vue";

const global = useGlobal();

const tableData = reactive({
  arr: [],
});
global.bus.off("classChange");

global.bus.on("classChange", (index) => {
  load();
});

function formatData(row, column, cellValue, index) {
  var s = new Date(cellValue).toLocaleString();
  return s;
}

async function load() {
  let data = await global.axios.post(`/teacher/student`, {
    id: global.data.currentClassId,
  });
  tableData.arr = data;
  console.log(data)
}

load();
</script>
    