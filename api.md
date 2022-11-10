# 全局
## 响应状态码
	status:{
		200："成功"
		400："请求体数据不规范"
		500："服务器出错（报错后没有设置响应的，统一响应该状态）"
	}
# user
## /user/register 用户注册
	method:post
	status:{
		200:"成功"
	}

## /user/login 用户登录
	method:post
	status:{
		200:"成功"
	}

## /user/password 修改密码
	method:post
	status:{
		200:"成功"
	}

## /user/wallet 用户钱包信息
	method:post
	status:{
		200:"成功"
	}

## /user/info 用户信息
	method:post
	status:{
		200:"成功"
	}

# discount
## /discount/coupon 优惠券信息
	method:post
	status:{
		200:"成功"
	}
	request:{
		"ids": Array<id>
	}
	response:{
		"status": 200,
		"data": Array<{
			"id": string,
			"name": string,
			"msg": string,
			"indate": Date
		}>
	}