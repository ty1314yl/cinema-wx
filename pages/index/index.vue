<template>
  <view >
		<!-- 上二楼 -->
		<view class="second"  :style="['height:'+sdfloor.height+'px',touch.htactive===true?touch.trans:'']" style="background:red"  v-if="sdfloor.show"  >
			我是二楼
      <view  class="backfirst" @click="backfirst">回到首页</view>
		</view>
		<view class="first" v-if="frfloor.show">
      <view class="status_height" v-if="!sdfloor.show"></view> 
      <view v-if="sdfloor.show" style="position:absolute;height:30px;top:-30px;border-radius:20px 20px 0 0;background:#f6f6f6;width:100%" ></view>
			<view class="df pr" :style="['height:'+status.height+'px',touch.htactive===true?touch.firststyle:'']" >
				<!--  #ifdef  APP-PLUS --> 
				<view class="df mt10 ml40 ct wdt14" :style="'line-height:'+status.height+'px'" >
					<text class=" dv1" >杭州人为撒撒网撒网</text>
					<u-icon class="ml5" name="arrow-down-fill" size="10"></u-icon>
				</view>
				<view class="wdt45 mt20 rgt80 pa" >
					<input  class="shadow padlr20 br40"
					   placeholder="请输入内容" :style="'height:'+(status.height-10)+'px'" 
					   v-model="value"
					   @change="change"  
					 />
				</view> 
				<!--  #endif -->
				<!--  #ifdef  MP -->
				<view class="df  ml40 ct wdt14" :style="'line-height:'+status.height+'px'">
					<text class=" dv1" >杭州人为撒撒网撒网</text>
					<u-icon class="ml5" name="arrow-down-fill" size="10"></u-icon>
				</view>
				<view class="wdt35 rgt210 pa" > 
					<input  class="shadow pl20 br40"
					   placeholder="请输入内容" :style="'height:'+status.height+'px'"
					   v-model="value"
					   @change="change"   
					 />
				</view>
				<!--  #endif -->
			</view>
			<view class="ht28" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
				我是触摸
			</view>
		</view>
	
	
  </view>  
</template>

<script setup>
import { onShow, onHide ,onLoad} from '@dcloudio/uni-app'
import { reactive,ref,watch } from "vue";
onLoad(()=> {  
    // uni.startPullDownRefresh({  
    //   success: function () {  
    //     console.log('下拉刷新成功');  
    //     // 执行刷新后的操作，如请求新的数据等  
    //   },  
    //   fail: function (error) {  
    //     console.log('下拉刷新失败', error);  
    //   },  
    //   complete: function () {  
    //     console.log('下拉刷新结束');  
    //   }  
    // });  
})
//搜索框高度
const status = reactive({
	height:40,
  windowHeight:''
}) 
const value=ref('')
// #ifdef MP
 let systemInfo = uni.getMenuButtonBoundingClientRect() 
 status.height=systemInfo.height
// #endif
onLoad(()=>{
  const res = uni.getSystemInfoSync()
  status.windowHeight = res.screenHeight
})
function change(e){
	console.log(e) 
};
//一楼数据
const frfloor = reactive({
  show:true
})
//二楼数据
const sdfloor = reactive({
  height:0,//高度
  show:false,//是否显示
})
//手势滑动距离数组
const touch = reactive({
	startY:'',
	moveY:'',
	endY:'',
	direction:'',
  status:false,
  htactive:false,
  touch:'',
  firststyle:''
})
//初始滑动距离
function touchStart(e) {  
  touch.htactive=false
	touch.startY = e.touches[0].clientY; // 获取初始Y坐标  
}
//移动滑动距离
function touchMove(e){
	touch.moveY = e.touches[0].clientY;// 获取移动Y坐标
	touch.direction = calculateDirection()
}
//离开滑动距离
function touchEnd(e) {  
	touch.endY = e.changedTouches[0].clientY; // 获取结束Y坐标  
  touch.status = true
  touch.direction = calculateDirection(); // 计算滑动方向   
}  
// 计算滑动方向
function calculateDirection() {     
  if (touch.moveY > touch.startY) {  
    touch.moveY - touch.startY <= status.height?sdfloor.height = (status.height+30-5):sdfloor.height = (touch.moveY - touch.startY)/2
    sdfloor.show=true 
    console.log(sdfloor.height)
		console.log('移动下拉') // 如果结束Y坐标大于初始Y坐标，则为上滑  
	} else if (touch.moveY < touch.startY) { 
    if(sdfloor.height<=(status.height+25)){
      sdfloor.show=false
    }
		console.log('移动上滑'); // 如果结束Y坐标小于初始Y坐标，则为下滑  
	} else {   
		console.log('未移动'); // 如果没有滑动，则为未滑动  
	}  
  //离开屏幕后计算值 
  if(touch.status){
    if (touch.endY > touch.startY) { 
      let time = Number((sdfloor.height-status.height)/300)
      if(sdfloor.height<=160){ 
        touch.htactive=true
        touch.trans=('transition: height '+ time +'s linear;') 
        sdfloor.height=0 
        uni.showTabBar()
        setTimeout(()=>{sdfloor.show=false},time*1000)
      }else{
        touch.htactive=true
        touch.trans=('transition: height '+ time +'s linear;') 
        sdfloor.height = status.windowHeight
        uni.hideTabBar()
        setTimeout(()=>{frfloor.show=false},time*1000)
      }
      console.log('下拉') // 如果结束Y坐标大于初始Y坐标，则为上滑  
    } else if (touch.endY < touch.startY) {  
      if(sdfloor.show){
        sdfloor.show=false
      }
      console.log('上滑'); // 如果结束Y坐标小于初始Y坐标，则为下滑  
    } else {  
      console.log('未滑动'); // 如果没有滑动，则为未滑动  
    }  
    touch.status = false
  }
	
}
function backfirst(){
  frfloor.show=true 
  touch.htactive=true
  touch.trans='transition: height 0.5s linear;' 
  sdfloor.height=0 
  uni.showTabBar()
  setTimeout(()=>{sdfloor.show=false},500)
}

 
</script>

<style lang="scss">
.status_height{
	height: var(--status-bar-height);
}
.second{
	position: relative;
}
.first{
  position: relative;
}
.backfirst{
  position:absolute;
  bottom:0;
  width: 100vh;
  border-radius: 20rpx 20rpx 0 0 ;
  height: 100rpx;
  background:#ddd;
}
</style>