'use strict';
// 云函数
exports.main = async function (event, context){
	const res = await uniCloud.getPhoneNumber({
		appid:context.APPID, // 客户端callFunction时携带的AppId信息
		provider: 'univerify',
		apiKey: '4a149bc60e06d37f460f0bbc23ce81b5', // 在开发者中心开通服务并获取apiKey
		apiSecret: 'a2c78a064ce7b354f583bb38dc9e5379', // 在开发者中心开通服务并获取apiSecret
		access_token: event.access_token,
		openid: event.openid
	})
	// 执行入库等操作，正常情况下不要把完整手机号返回给前端
	return {
		code: 0,
		data:res,
		message: '获取手机号成功',
	
	}
}