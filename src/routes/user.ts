import express from 'express';
import { body as validatorBody } from "express-validator";

import { register, login, changePassword, getWallet, getUserInfo } from "@/controller/user";
import useTokenVerify from "@/utils/tokenVerifyMiddleware";
import reqJsonValidatorMiddleware from "@/utils/reqJsonValidatorMiddleware";

const router = express.Router();
router.post('/', function (req, res, next) {
	res.send('/user');
});
// 用户注册
router.post(
	'/register',
	[
		validatorBody('userName').matches(/^[0-9a-z]{1,18}$/i),
		validatorBody('password').matches(/^.{6,18}$/)
	],
	reqJsonValidatorMiddleware,
	register
);
// 用户登录
router.post(
	'/login',
	[
		validatorBody('userName').exists({ checkNull: true, checkFalsy: true }),
		validatorBody('password').exists({ checkNull: true, checkFalsy: true })
	],
	reqJsonValidatorMiddleware,
	login
);
// 修改密码
router.post(
	'/password',
	[
		validatorBody('userName').exists({ checkNull: true, checkFalsy: true }),
		validatorBody('password').exists({ checkNull: true, checkFalsy: true }),
		validatorBody('newPassword').exists({ checkNull: true, checkFalsy: true })
	],
	reqJsonValidatorMiddleware,
	changePassword
);
//用户钱包信息
router.post('/wallet', useTokenVerify, getWallet);
//用户信息
router.post('/info', useTokenVerify, getUserInfo);

export default router;