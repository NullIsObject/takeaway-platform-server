import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";
// import { addUser, userSelect, userChangePassword, selectUserWallet, selectUserDiscounts } from "@/model/index";
import { token } from "@/config";

const { JWTsecretKey, algorithm, tokenExpiresIn } = token;

type Middleware = (req: Request, res: Response, next: NextFunction) => void;

// export const register: Middleware = (req, res, next) => {
// 	// 用户注册
// 	// 判断用户是否存在，不存在再创建账户
// 	const { body } = req;
// 	const userNameRule = /^[0-9a-z]{1,18}$/i;
// 	const passWordRule = /^.{6,18}$/;
// 	const { userName, password } = body;
// 	if (!userName || !password || !userNameRule.test(userName) || !passWordRule.test(password)) {
// 		res.status(403).json({
// 			status: 403,
// 			msg: "用户名或密码不符合规范"
// 		})
// 		return;
// 	}
// 	userSelect({ userName, password }, (err, results, fields) => {
// 		if (err) {
// 			res.status(500).json({
// 				status: 500,
// 				msg: "服务器内部错误，无法完成请求"
// 			})
// 			return;
// 		}
// 		if (results.length !== 0) {
// 			res.status(403).json({
// 				status: 403,
// 				msg: "用户已存在"
// 			})
// 			return;
// 		}
// 		addUser({
// 			userName: userName,
// 			password: password
// 		}, (err, results, fields) => {
// 			if (err) {
// 				res.status(500).json({
// 					status: 500,
// 					msg: "服务器内部错误，无法完成请求"
// 				})
// 			} else {
// 				res.status(200).json({
// 					status: 200,
// 					msg: "用户创建成功"
// 				})
// 			}
// 		});
// 		return;
// 	})
// 	return;
// }

// export const login: Middleware = (req, res, next) => {
// 	// 用户登录
// 	const { body } = req;
// 	const { userName, password } = body;
// 	if (!userName || !password) {
// 		res.status(400).json({
// 			status: 400,
// 			msg: "请求缺少所需参数"
// 		})
// 		return;
// 	}
// 	userSelect({ userName, password }, (err, results, fields) => {
// 		if (err) {
// 			res.status(500).json({
// 				status: 500,
// 				msg: "未知错误，请重试"
// 			});
// 		} else if (results.length === 0) {//判断用户是否存在
// 			res.status(403).json({
// 				status: 403,
// 				msg: "用户名或密码错误"
// 			});
// 		} else {
// 			const token = jsonwebtoken.sign({ userName }, JWTsecretKey, { algorithm, expiresIn: tokenExpiresIn });
// 			res.status(200).cookie("token", token, { maxAge: tokenExpiresIn }).json({
// 				status: 200,
// 				msg: "登录成功"
// 			});
// 		}
// 		return;
// 	});
// }

// export const changePassword: Middleware = (req, res, next) => {
// 	// 修改密码
// 	const { body } = req;
// 	const { userName, password, newPassword } = body;
// 	if (!userName || !password || !newPassword) {
// 		res.status(400).json({
// 			status: 400,
// 			msg: "请求缺少所需参数"
// 		})
// 		return;
// 	}
// 	userChangePassword({ userName, password, newPassword }, (isSuccess, msg) => {
// 		if (isSuccess) {
// 			res.status(200).json({
// 				status: 200,
// 				msg: "成功"
// 			})
// 		} else {
// 			res.status(500).json({
// 				status: 500,
// 				msg: "服务器内部错误，无法完成请求"
// 			})
// 		}
// 	})
// }

// export const getWallet: Middleware = (req, res, next) => {
// 	// 获取用户钱包信息
// 	const userToken: any = jsonwebtoken.decode(req.cookies.token);
// 	const userName: string = userToken?.userName;
// 	// 查询钱包信息，返回所有信息，
// 	// 根据钱包信息的优惠券id获取优惠券信息返回到客户端
// 	// 注意代码异步执行


	
// }