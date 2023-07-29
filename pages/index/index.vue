<template>
	<view class="content">
		主页
			<u-button text="跳转页面" @click="torouter"></u-button>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	const show = ref(true)
	function onLogin(){
	}
	function close(){
		show.value=false
	}
	function torouter(){
		uni.navigateTo({
			url:'/pages/login/login'
		})
	}

</script>

<style lang="scss">
</style>
