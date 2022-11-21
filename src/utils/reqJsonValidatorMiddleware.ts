// 请求数据验证失败后统一响应
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { requestError } from "@/utils/fixedResponse";
export default (req: Request, res: Response, next: NextFunction) => {
	if (validationResult(req).isEmpty()) return next()
	requestError(res)
}