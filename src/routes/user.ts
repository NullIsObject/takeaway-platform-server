import express from 'express';
import { register, login, changePassword, getWallet, getUserInfo } from "@/controller/user";
import { tokenVerify, errorMiddleWare } from "@/utils/useTokenVerify";

const router = express.Router();
router.post('/', function (req, res, next) {
	res.send('/user');
});

router.post('/register', register);//用户注册
router.post('/login', login);//用户登录
router.post('/password', changePassword);//修改密码
router.post('/wallet', tokenVerify, errorMiddleWare, getWallet);//用户钱包信息
router.post('/info', tokenVerify, errorMiddleWare, getUserInfo);//用户信息

export default router;