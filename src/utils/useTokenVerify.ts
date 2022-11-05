import { Request, Response, NextFunction } from "express";
import { expressjwt } from "express-jwt";
import jsonwebtoken from "jsonwebtoken";
import { token } from "@/config";
const { JWTsecretKey, algorithm } = token;
export const tokenVerify = expressjwt({
	// 验证token是否有效
	secret: JWTsecretKey,
	algorithms: [algorithm],
	getToken(req) {
		return req.cookies.token;
	}
})

export const tokenContentVerify = (req: Request, res: Response, next: NextFunction) => {
	// 验证token是否包含所需信息
	const userToken: any = jsonwebtoken.decode(req.cookies.token);
	if (!userToken.userId) {
		res.status(401).json({
			status: 401,
			msg: "用户身份验证失败"
		})
	} else next()
}

export const errorMiddleWare = (err: Error, req: Request, res: Response, next: NextFunction) => {
	// 错误处理
	res.status(401).json({
		status: 401,
		msg: "用户身份验证失败"
	})
}

export default { tokenVerify, tokenContentVerify, errorMiddleWare }