<template>
  <!-- 机构详情 -->
  <view>
    <uni-section>
      <view>
        <uni-nav-bar
          shadow
          left-icon="left"
          @clickLeft="fs"
          leftText="返回"
          right-icon="trash-filled"
          @clickRight="fm"
         
        />
        
      </view>
      <text class="uni-body">
        <uni-list v-for="ite in tableData.arr" :key="ite.i">
        
          <uni-list-item showArrow title="id" :rightText="ite.id" />
          <uni-list-item showArrow title="状态" :rightText="ite.status" />
          <uni-list-item showArrow title="机构名称" :rightText="ite.name" />
          <uni-list-item
            showArrow
            title="法定代表"
            :rightText="ite.legalPerson"
          />
          <uni-list-item
            showArrow
            title="法定代表身份证号码"
            :rightText="ite.legalPersonIdentityNo"
          />
          <uni-list-item
            showArrow
            title="营业执照"
            :rightText="ite.businessLicense"
          />
          <uni-list-item
            showArrow
            title="营业执照照片"
            :rightText="ite.applicantName"
          />
          <uni-list-item
            showArrow
            title="申请人"
            :rightText="ite.applicantIdentityNo"
          />
          <uni-list-item
            showArrow
            title="创建时间"
            :rightText="ite.createTime"
          ></uni-list-item>
        </uni-list>
      </text>
    </uni-section>
  </view>
	<tab-bar></tab-bar>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import useGlobal from "../../utils/useGlobal";
import { onShow, onLoad } from "@dcloudio/uni-app";
const global = useGlobal();
let idas = ref();
onLoad((e) => {
  idas.value = e.id;
});
onShow(() => {
  request();
});

let tableData = reactive({
  arr: [
    {
      id: "",
      status: "",
      name: "",
      legalPerson: "",
      legalPersonIdentityNo: "",
      businessLicense: "",
      applicantName: "",
      applicantIdentityNo: "",
      createTime: "",
      updateTime: "",
    },
  ],
});
// 请求机构详情
async function request() {
  let e = await global.axios.get("/public/search-detail", {
    params: {
      id: idas.value,
    },
  });
  tableData.arr = e;
  tableData.arr[0].createTime = new Date(
    tableData.arr[0].createTime
  ).toLocaleString();
  tableData.arr[0].updateTime = new Date(
    tableData.arr[0].updateTime
  ).toLocaleString();
  console.log(idas.value)
}

// 返回机构列表
let fs = () => {
  uni.reLaunch({
    url: "Administratorname?id",
  });
};

// 删除该机构
async function fm() {
  		   uni.reLaunch({
         url: "Administratorname?id",
  });
 await global.axios.post("/platform-admin/remove-school", {
    id: idas.value,
  });
}
  
 function ff(){

        // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
        this.$refs.popup.open('top')
      
  }

</script>