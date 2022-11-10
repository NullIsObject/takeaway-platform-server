import { Response } from "express"
export const requestError = (res: Response) => {
	res.status(400).json({
		status: 400,
		msg: "请求体数据不规范"
	})
}