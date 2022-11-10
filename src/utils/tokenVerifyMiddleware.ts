import { expressjwt } from "express-jwt";
import { token } from "@/config";
import { ErrMiddleware, Middleware } from "@/types";
const { JWTsecretKey, algorithm } = token;

export const tokenVerify = expressjwt({
	// 验证token是否有效
	secret: JWTsecretKey,
	algorithms: [algorithm],
	getToken(req) {
		return req.cookies.token;
	}
})

export const errorMiddleWare: ErrMiddleware = (err, req, res, next) => {
	// 错误处理
	res.status(401).json({
		status: 401,
		msg: "用户身份验证失败"
	})
}

export default [ tokenVerify, errorMiddleWare ]