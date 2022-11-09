import jsonwebtoken from "jsonwebtoken";
import { addUser, userSelect, userVerify, userChangePassword, selectUserWallet } from "@/model";
import { token } from "@/config";
import getUserId from "@/utils/getUserId";
import { Middleware } from "@/types";

const { JWTsecretKey, algorithm, tokenExpiresIn } = token;

export const register: Middleware = async (req, res, next) => {
	// 用户注册
	const { body } = req;
	const userNameRule = /^[0-9a-z]{1,18}$/i;
	const passWordRule = /^.{6,18}$/;
	const { userName, password } = body;
	if (!userName || !password || !userNameRule.test(userName) || !passWordRule.test(password)) {
		res.status(403).json({
			status: 403,
			msg: "用户名或密码不符合规范"
		})
		return;
	}
	const userSelectResult = await userSelect({ userName });
	if (userSelectResult.length) {
		res.status(403).json({
			status: 403,
			msg: "用户已存在"
		})
		return 0;
	}
	await addUser({ userName: userName, password: password });
	res.status(200).json({
		status: 200,
		msg: "用户创建成功"
	})
}

export const login: Middleware = async (req, res, next) => {
	// 用户登录
	const { body } = req;
	const { userName, password } = body;
	if (!userName || !password) {
		res.status(400).json({
			status: 400,//请求缺少所需参数
			msg: "登录失败"
		})
		return;
	}
	const userVerifyResult = await userVerify({ userName, password });
	if (!userVerifyResult.length) {
		res.status(403).json({
			status: 403,
			msg: "用户名或密码错误"
		})
		return;
	}
	const { id } = userVerifyResult[0];
	const token = jsonwebtoken.sign({ userId: id }, JWTsecretKey, { algorithm, expiresIn: tokenExpiresIn });
	const sendData = {
		userId: userVerifyResult[0]["id"],
		userName: userVerifyResult[0]["user_name"],
		sex: userVerifyResult[0]["sex"],
		city: userVerifyResult[0]["city"],
		photo: userVerifyResult[0]["photo"]
	}
	res.status(200).cookie("token", token, { maxAge: tokenExpiresIn * 1000 }).json({
		status: 200,
		msg: "登录成功",
		data: sendData
	});
}

export const changePassword: Middleware = async (req, res, next) => {
	// 修改密码
	const { body } = req;
	const { userName, password, newPassword } = body;
	if (!userName || !password || !newPassword) {
		res.status(400).json({
			status: 400,
			msg: "请求缺少所需参数"
		})
		return;
	}
	const userVerifyResult = await userVerify({ userName, password });
	if (!userVerifyResult.length) {
		res.status(403).json({
			status: 403,
			msg: "用户名或密码错误"
		})
		return;
	}
	await userChangePassword({ userName, newPassword });
	res.status(200).json({
		status: 200,
		msg: "成功"
	});
}

export const getWallet: Middleware = async (req, res, next) => {
	// 获取用户钱包信息
	// token数据验证在单独的token验证中间件完成
	const userToken: any = jsonwebtoken.decode(req.cookies.token);
	const userId = String(userToken.userId);
	const selectUserWalletResult = await selectUserWallet({ id: userId });
	let sendData: { userId: string, money: number, score: number, discountIds: Array<string> };
	if (!selectUserWalletResult.length) {
		res.status(500).json({
			status: 500,
			msg: "服务器出错"
		});
		return;
	}
	let discountIds: Array<string> = selectUserWalletResult[0].discounts.split(';')
	sendData = {
		userId: userId,
		money: selectUserWalletResult[0].money,
		score: selectUserWalletResult[0].score,
		discountIds
	}
	res.status(200).json({
		status: 200,
		msg: "成功",
		data: sendData
	});
}

export const getUserInfo: Middleware = async (req, res, next) => {
	const userId = getUserId(req)
	if (!userId) {
		res.status(401).json({
			status: 401,
			msg: "用户身份验证失败"
		})
		return
	}
	const userInfos = await userSelect({ userId });
	const sendData = {
		userId: userInfos[0]["id"],
		userName: userInfos[0]["user_name"],
		sex: userInfos[0]["sex"],
		city: userInfos[0]["city"],
		photo: userInfos[0]["photo"]
	}
	res.status(200).json({
		status: 200,
		msg: "成功",
		data: sendData
	});
}