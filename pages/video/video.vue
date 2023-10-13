<template>
  <view class="video">
    <view class="video__header"></view>
    <view class="w100 pr" :style="'height:' + (video.height - video.tabBarHeight) + 'px;'">
      <video class="w100" :style="'height:' + (video.height - video.tabBarHeight) + 'px;'"
        src="http://101.35.49.94:8888/down/HcG7NYyXHHJR.mp4" :show-center-play-btn="false" :controls="false"
        @click="videopaly($event)"></video>
      <view class="center wdt10 ht10 br50  ">
        <view class="center wdt10 ht10 br50 bgc000000  opt4"></view>
        <image src="/static/imgs/play.png" class="wdt6 ht6 center opt9" alt="" />
      </view>
      <view class="video__utils pa rgt10 btm80 clrffffff">
        111
      </view>
      <view class="video__bottom"></view>
    </view>
 
  </view>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { onShow, onHide } from '@dcloudio/uni-app'
const video = reactive({
  height: '',
  tabBarHeight: 0
})
onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  video.height = systemInfo.screenHeight
  // 判断平台和系统版本
  if (systemInfo.platform === 'android') {
    if (systemInfo.system.indexOf('8.') > -1 || systemInfo.system.indexOf('9.') > -1) {
      video.tabBarHeight = 50 + systemInfo.safeArea.bottom // Android 8.0及以上系统
    } else {
      video.tabBarHeight = 50 // 其它Android系统
    }
  } else if (systemInfo.platform === 'ios') {
    video.tabBarHeight = 49 // iOS系统
  } else {
    video.tabBarHeight = 50 // 其它平台
  }
})
function videopaly(event) {
  console.log(event)
}
onShow(() => {
  uni.setTabBarStyle({
    backgroundColor: '#000000',
    borderStyle: 'black'
  })
})
onHide(() => {
  uni.setTabBarStyle({
    backgroundColor: '#ffffff',
    borderStyle: 'black'
  })
})
</script>

<style lang="scss" scoped></style>