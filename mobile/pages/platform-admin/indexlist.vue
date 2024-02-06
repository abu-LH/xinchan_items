<template>
  <view>
    <view class="box-bg">
      <uni-nav-bar
        shadow
        left-icon="left"
        @clickLeft="fs"
        leftText="返回"
        right-icon="trash-filled"
        @clickRight="fm"
      />
    </view>

    <uni-section>
      <text class="uni-body">
        <uni-list v-for="ite in tableData.arr" :key="ite.id">
          <uni-list-item showArrow title="id" :rightText="ite.id" />
          <uni-list-item showArrow title="姓名" :rightText="ite.name" />
          <uni-list-item showArrow title="性别" :rightText="ite.gender" />
          <uni-list-item showArrow title="手机" :rightText="ite.phone" />
          <uni-list-item showArrow title="状态" :rightText="ite.status" />
          <uni-list-item showArrow title="所属机构" :rightText="ite.schoolId" />
          <uni-list-item
            showArrow
            title="登录用户名"
            :rightText="ite.username"
          />
          <uni-list-item showArrow title="身份" :rightText="ite.role" />

          <uni-list-item
            showArrow
            title="邮箱"
            :rightText="ite.email"
          ></uni-list-item>
          <uni-list-item
            showArrow
            title="创建时间"
            :rightText="ite.createTime"
          ></uni-list-item>
          <uni-list-item
            showArrow
            title="更新时间"
            :rightText="ite.updateTime"
          ></uni-list-item>
        </uni-list>
      </text>
    </uni-section>
  </view>
</template>

<script setup>
1;
import { reactive, onMounted, ref } from "vue";
import useGlobal from "../../utils/useGlobal";
import { onShow, onLoad } from "@dcloudio/uni-app";
const global = useGlobal();
let ida = ref();
onLoad((e) => {
  ida.value = e.id;
});
onShow(() => {
  request();
});

let tableData = reactive({
  arr: [
    {
      id: "",
      schoolId: "",
      schoolName: "",
      name: "",
      role: "",
      roleType: "",
      status: "",
      username: "",
      gender: "",
      phone: "",
      email: "",
      createTime: "",
      updateTime: "",
    },
  ],
});

// 请求用户详情、
async function request() {
  let e = await global.axios.get("/platform-admin/userOrgDetail", {
    params: {
      id: ida.value,
    },
  });
  tableData.arr = e;
  tableData.arr[0].createTime = new Date(
    tableData.arr[0].createTime
  ).toLocaleString();
  tableData.arr[0].updateTime = new Date(
    tableData.arr[0].updateTime
  ).toLocaleString();
}
// 返回搜索页
let fs = () => {
  uni.reLaunch({
    url: "index?id",
  });
};

// 删除该用户
async function fm() {
  await global.axios.post("/platform-admin/remove-user", {
    id: ida.value,
  });
}
</script>