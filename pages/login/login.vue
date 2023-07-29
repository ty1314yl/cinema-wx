<template>
	<view class="content">
		11
		 <u--input type="nickname"
		    placeholder="请输入内容"
		    border="surround"
		    v-model="value"
		    @change="change"
		  ></u--input>
				<u-button text="选择头像"  open-type="chooseAvatar"></u-button>
			<u-button text="一键登录" @click="onLogin"></u-button>
	</view>
</template>

<script setup>
	import {ref} from 'vue'
	const show = ref(true)
	function onLogin(){
				
				// #ifdef APP-PLUS
				// 使用时不需要传递 provider
				const univerifyManager = uni.getUniverifyManager()
				// 预登录
				// 参数和 uni.preLogin 相同
				univerifyManager.preLogin()
				// 调用一键登录弹框
				// 仅需传参 univerifyStyle 即可
				univerifyManager.login({
				  univerifyStyle: {
						"fullScreen": true, // 是否全屏显示，默认值： false
						"backgroundColor": "#ffffff",  // 授权页面背景颜色，默认值：#ffffff
						"backgroundImage": "", // 全屏显示的背景图片，默认值："" （仅支持本地图片，只有全屏显示时支持）  
						"icon": {  
								"path": "static/logo.png" // 自定义显示在授权框中的logo，仅支持本地图片 默认显示App logo   
						},  
						"closeIcon": {  
								"path": "static/back.png" // 自定义关闭按钮，仅支持本地图片。 HBuilderX3.3.7+版本支持
						},  
						"phoneNum": {  
								"color": "#202020"  // 手机号文字颜色 默认值：#202020  
						},  
						"slogan": {  
								"color": "#BBBBBB"  //  slogan 字体颜色 默认值：#BBBBBB  
						},  
						"authButton": {  
								"normalColor": "#1aa034", // 授权按钮正常状态背景颜色 默认值：#3479f5  
								"highlightColor": "#2861c5",  // 授权按钮按下状态背景颜色 默认值：#2861c5（仅ios支持）  
								"disabledColor": "#73aaf5",  // 授权按钮不可点击时背景颜色 默认值：#73aaf5（仅ios支持）  
								"textColor": "#ffffff",  // 授权按钮文字颜色 默认值：#ffffff  
								"title": "本机号码一键登录", // 授权按钮文案 默认值：“本机号码一键登录”  
								"borderRadius": "24px"	// 授权按钮圆角 默认值："24px" （按钮高度的一半）
						},  
						"otherLoginButton": {  
								"visible": true, // 是否显示其他登录按钮，默认值：true  
								"normalColor": "", // 其他登录按钮正常状态背景颜色 默认值：透明 
								"highlightColor": "", // 其他登录按钮按下状态背景颜色 默认值：透明 
								"textColor": "#656565", // 其他登录按钮文字颜色 默认值：#656565  
								"title": "其他登录方式", // 其他登录方式按钮文字 默认值：“其他登录方式”  
								"borderColor": "",  //边框颜色 默认值：透明（仅iOS支持）  
								"borderRadius": "0px" // 其他登录按钮圆角 默认值："24px" （按钮高度的一半）
						},  
						"privacyTerms": {  
								"defaultCheckBoxState":true, // 条款勾选框初始状态 默认值： true
								"isCenterHint":false, //未勾选服务条款时点击登录按钮的提示是否居中显示 默认值: false (3.7.13+ 版本支持)
								"uncheckedImage":"", // 可选 条款勾选框未选中状态图片（仅支持本地图片 建议尺寸 24x24px）(3.2.0+ 版本支持)   
								"checkedImage":"", // 可选 条款勾选框选中状态图片（仅支持本地图片 建议尺寸24x24px）(3.2.0+ 版本支持)   
								"checkBoxSize":12, // 可选 条款勾选框大小，仅android支持
								"textColor": "#BBBBBB", // 文字颜色 默认值：#BBBBBB  
								"termsColor": "#5496E3", //  协议文字颜色 默认值： #5496E3  
								"prefix": "我已阅读并同意", // 条款前的文案 默认值：“我已阅读并同意”  
								"suffix": "并使用本机号码登录", // 条款后的文案 默认值：“并使用本机号码登录”  
								"privacyItems": [  // 自定义协议条款，最大支持2个，需要同时设置url和title. 否则不生效
										{
											"url":"https://",
											"title":"cinema影院用户协议",
										},
										{  
												"url": "https://", // 点击跳转的协议详情页面  
												"title": "用户服务协议" // 协议名称  
										}  
								]  
						}
				  },
				  success (res) {
						// 客户端
						uniCloud.callFunction({
							name: 'getPhoneNumber', // 云函数名称
							data: { //传给云函数的参数
								'access_token': res.authResult.access_token, // 客户端一键登录接口返回的access_token
								'openid': res.authResult.openid // 客户端一键登录接口返回的openid
								},
							success(callRes) {
								// 此处可获得手机号，调用后端接口
								console.log(callRes.result.data)
								console.log(callRes.result.data.phoneNumber)
								},
								fail(callErr) {
									console.log('调用云函数出错', callErr)
								},
							complete() {
								uni.closeAuthView() //关闭授权登录界面
							}
						})
				  },
					fail(err) { //预登录失败
						console.log('错误码：', err)
						console.log(err.errMsg)
					}
				})
				
				const callback = (res) => {
				  // 获取一键登录弹框协议勾选状态
				  // 参数和 uni.getCheckBoxState 相同
				  univerifyManager.getCheckBoxState({
				    success(res) {
				      console.log("getCheckBoxState res: ", res);
				      if (res.state) {
				        // 关闭一键登录弹框
				        // 参数和 uni.closeAuthView 相同
				        univerifyManager.close()
				      }
				    }
				  })
				}
				
				// #endif
				// #ifdef MP-WEIXIN
				
				wx.login({
				  success: res => {
				    if (res.code) {
				      // 将code发送到服务器获取openid等信息
				      wx.request({
				        url: 'https://yourserver.com/login',
				        method: 'POST',
				        data: { code: res.code },
				        success: res => {
				          var openid = res.data.openid;
				          var session_key = res.data.session_key;
				          // 步骤2：解密获取unionId
				          var pc = new WXBizDataCrypt(APP_ID, session_key);
				          var decryptedData = pc.decryptData(encryptedData , iv);
				          var unionId = decryptedData.unionId;
				          // 步骤3：向微信服务器请求获取用户信息
				          wx.request({
				            url: 'https://api.weixin.qq.com/cgi-bin/user/getuserid?access_token='+ACCESS_TOKEN,
				            method: 'POST',
				            data: {
				              "userid": unionId
				            },
				            success: res => {
				              console.log(res.data);
				            }
				          })
				        }
				      })
				    } else {
				      console.log('登录失败！' + res.errMsg)
				    }
				  }
				}),
					fail(res){  // 登录失败
						console.log(res.errCode)
						console.log(res.errMsg)
					}
				});
				uni.getUserProfile({
					desc:'获取你的昵称，头像，地区及性别',
					success:function(res){
						console.log(res.userInfo)
						console.log(res.errMsg)	
					},
					fail:function(res){
						console.log(res)
					}
				})
				// #endif

		
	}
	function close(){
		show.value=false
	}

</script>

<style lang="scss">
</style>
