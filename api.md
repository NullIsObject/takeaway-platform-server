# 全局
## 响应状态码
	status:{
		200:"成功",
		400:"请求体数据不规范",
		401:身份验证失败,
		500:"服务器出错（报错后没有设置响应的，统一响应该状态）"
	}
# user
## /user/register 用户注册
	method:post
	status:{
		403:"用户已存在"
	}
	request:{
		userName:string,
		password:string
	}
	response:{
		status: 200,
		msg: "用户创建成功"
	}

## /user/login 用户登录
	method:post
	status:{
		403:"用户名或密码错误"
	}
	request:{
		userName:string,
		password:string
	}
	response:{
		status: 200,
		msg: "登录成功",
		data: {
			userId: string,
			userName: string,
			sex: string,
			city: string,
			photo: string
		}
	}

## /user/password 修改密码
	method:post
	status:{
		403:"用户名或密码错误"
	}
	request:{
		userName:string,
		password:string,
		newPassword
	}
	response:{
		status: 200,
		msg: "成功"
	}

## /user/wallet 用户钱包信息
	method:post
	response:{
		status: 200,
		msg: "成功",
		data: {
			userId: string,
			money: number,
			score: number,
			discountIds: Array<string>
		}
	}

## /user/info 用户信息
	method:post
	response:{
		status: 200,
		msg: "成功",
		data: {
			userId: string,
			userName: string,
			sex: string,
			city: string,
			photo: string
		}
	}

# discount
## /discount/coupon 优惠券信息
	method:post
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