<template>
    <div>
    <span style="color:black;font-size:20px;" empty-text="没有啦">打卡记录</span>
<!--表单-->
    <el-table :data="filterTableData"  style="width: 100%">
    <el-table-column label="名字" prop="name" width="auto" />
    <el-table-column prop="createTime" label="早上"  :formatter="formatData" width="auto" />
    <el-table-column prop="updateTime" label="晚上"  :formatter="formatData" width="auto"/>
    <el-table-column prop="state" label="状态" width="auto"/>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="日期/名字" />
      </template>
    </el-table-column>
  </el-table>
    </div>
    </template>
    
    <script lang="ts" setup>
    
    import { reactive,computed,ref  } from 'vue'
    import useGlobal from '../../utils/useGlobal';
    
    const global=useGlobal()

    global.bus.off('classChange') 
    
    global.bus.on('classChange',index=>{
      insert()
    }) 

    function formatData(row, column, cellValue, index) {

        var s = new Date(cellValue).toLocaleString();
        return s;

    }

    interface User {
        date: string
        name: string
        address: string
      }

const search = ref('')
const filterTableData = computed(() =>
  tableData.arr.filter(
    (data) =>
      !search.value ||
      data.createTime.toLowerCase().includes(search.value.toLowerCase()) ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  )
)
console.log(search.value.toLowerCase())
const handleEdit = (index: number, row: User) => {
  localStorage.setItem("学生打卡",row.name)
  global.router.push("ClassLoop")
}

const tableData=reactive({
  arr:[]
})
async function insert() {
      let data=await global.axios.post("/teacher/ClassDEtails",{id:global.data.currentClassId});
      console.log(data)
      tableData.arr=data.filter(item=>item.createTime=new Date(item.createTime).toLocaleString());
    }
insert()


    </script>
    