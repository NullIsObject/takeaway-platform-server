import { Request, Response, NextFunction } from "express";
import jsonwebtoken from "jsonwebtoken";
import { addUser, userSelect, userChangePassword } from "@/model/index";
import hashPassWord from "@/utils/hash-password";
import { token } from "@/config";

const { JWTsecretKey, algorithm, tokenExpiresIn } = token;

type Application = (req: Request, res: Response, next: NextFunction) => void;

export const register: Application = (req, res, next) => {
	const { body } = req;
	const userNameRule = /^[0-9a-z]{1,18}$/i;
	const passWordRule = /^.{6,18}$/;
	let { userName, password } = body;
	if (!userName || !password || !userNameRule.test(userName) || !passWordRule.test(password)) {
		res.status(403).json({
			status: 403,
			msg: "用户名或密码不符合规范"
		})
		return;
	}
	password = hashPassWord({ userName, password });
	addUser({
		userName: userName,
		password: password
	}, (err, results, fields) => {
		if (err) {
			res.status(403).json({
				status: 403,
				msg: "用户已存在"
			})
		} else {
			res.status(200).json({
				status: 200,
				msg: "成功"
			})
		}
	});
	return;
}

export const login: Application = (req, res, next) => {
	const { body } = req;
	let { userName, password } = body;
	password = hashPassWord({ userName, password });//加密密码
	userSelect({ userName, password }, (err, results, fields) => {
		if (err) {
			res.status(500).json({
				status: 500,
				msg: "未知错误，请重试"
			})
		} else if (results.length === 0) {//判断用户是否存在
			res.status(403).json({
				status: 403,
				msg: "用户名或密码错误"
			})
		} else {
			const token = jsonwebtoken.sign({ userName }, JWTsecretKey, { algorithm, expiresIn: tokenExpiresIn });
			res.cookie("token", token, { maxAge: tokenExpiresIn });
			res.status(200).json({
				status: 200,
				msg: "成功"
			})
		}
		return;
	})
}

export const changePassword: Application = (req, res, next) => {
	const { body } = req;
	const { userName, password, newPassword } = body;
	userChangePassword({ userName, password, newPassword }, (isSuccess, msg) => {
		//保证客户端传输的数据///////////////////////////////////////////////////////////////////////
	})
	res.send("changePassword")
}