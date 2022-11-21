import express from 'express';
import { body as validatorBody } from "express-validator";
import { coupon } from "@/controller/discount";
import reqJsonValidatorMiddleware from "@/utils/reqJsonValidatorMiddleware";

const router = express.Router();
// 获取优惠券信息
router.post(
	'/coupon',
	[
		validatorBody("ids")
			.isArray({ min: 1 })
			.custom((val, { req }) =>
				val.every((val: any) => !Number.isNaN(Number(val)))
			)
	],
	reqJsonValidatorMiddleware,
	coupon
);

export default router;