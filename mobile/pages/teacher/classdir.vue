<template>
  <view style="height: 100%;background-color: white;">
	  	<uni-section title="修改课次"  type="line" >
	  			<uni-easyinput v-model="input" :styles="styles"></uni-easyinput>
	  	</uni-section>
		<uni-section :title="'修改结束时间'" type="line"></uni-section>
			<view class="example-body">
				<uni-datetime-picker v-model="single"/>
			</view>
		<uni-section :title="'修改结束时间'" type="line" ></uni-section>
			<view class="example-body">
				<uni-datetime-picker v-model="single1"/>
			</view>
			<button class="button" type="primary" @click="update" style="width: 400rpx;margin-top: 40rpx;">确认修改</button>
			<view>
				<uni-popup ref="mess" type="message">
						<uni-popup-message :type="msgType" :message="text" :duration="2000"></uni-popup-message>
				</uni-popup>
			</view>
					<uni-fab ref="fab" :pattern="pattern" popMenu="true" :content="content" horizontal="right" vertical="bottom"
						:direction="direction" @trigger="trigger" @fabClick="fabClick" />
	
			</view>
</template>
      
<script  setup>
import { ref, reactive ,getCurrentInstance} from "vue";
import useGlobal from "../../utils/useGlobal";

const placeholderStyle = ref("color:#2979FF;font-size:14px");
const styles = reactive({
					// color: '#2979FF',
					// borderColor: '#2979FF',
				});
//课次同步
const input = ref("");
//时间同步
const single=ref("")
const single1=ref("")
//弹框
const mess=ref(null)
const text=ref("")
const msgType=ref("")
//悬浮按钮
const pattern=reactive({
					color: 'balck',
				})
const is_color_type=ref(false)
const fab=ref(null)
const content=reactive([{
						text: '新增课次',
						active: true
					},
					{
						text: '上传课件',
						active: true
					},
				])
function trigger(e) {
				console.log(e)
				if(e.index==0){
					uni.navigateTo({
						url: 'AddDelete'
					});
				}else if(e.index==1){
					uni.navigateTo({
						url: 'uploading'
					});
				}
				
			}
function fabClick() {
				// uni.navigateTo({
				// 	url: 'AddDelete'
				// });
			}
const global = useGlobal();


global.bus.off("classChange");

global.bus.on("classChange", (index) => {
  
});






onlad();

async function onlad() {
  uni.getStorage({
  	key: '课程名称',
  	success: function (res) {
  		input.value=res.data.name
		console.log(res.data.startTime)
		single.value = new Date(res.data.endTime).toString();
		single1.value = new Date(res.data.endTime).toString();
  	}
  });
}

async function update() {
	let id;
	uni.getStorage({
		key: '课程名称',
		success: function (res) {
			id=res.data.id
		}
	});
	
  let data = await global.axios.post("/teacher/theSame", {
    startTime: new Date(single.value).toLocaleString().replace(/[\u4e00-\u9fa5]/g," ").replaceAll("/", "-"),
    endTime: new Date(single1.value).toLocaleString().replace(/[\u4e00-\u9fa5]/g," ").replaceAll("/", "-"),
  });
  if (data.length > 1) {
	text.value="时间冲突"
	msgType.value="error"
	mess.value.open()
  } else {
    let data = await global.axios.post("/teacher/classupdat", {
      name: input.value,
      createTime: new Date(single.value).toLocaleString().replace(/[\u4e00-\u9fa5]/g," ").replaceAll("/", "-"),
      updateTime: new Date(single1.value).toLocaleString().replace(/[\u4e00-\u9fa5]/g," ").replaceAll("/", "-"),
      id:id,
    });
    if (data.affectedRows > 0) {
	   text.value="修改成功"
	   msgType.value="success"
		mess.value.open()
	uni.$emit('update')
    } else {
	text.value="修改失败"
	msgType.value="error"
	mess.value.open()
    }
  }
}




</script>
    
<style scoped>

</style>
      