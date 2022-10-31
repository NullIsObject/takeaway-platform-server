import express from 'express';
import { Request, Response, NextFunction } from "express";
import { expressjwt } from "express-jwt";
import { register, login, changePassword, getWallet } from "@/controller/user";
import { token } from "@/config";

const { JWTsecretKey, algorithm } = token;
const router = express.Router();
const wallet = express.Router();
router.post('/', function (req, res, next) {
	res.send('/user');
});

router.post('/login', login);
router.post('/register', register);
router.post('/password', changePassword);
wallet.use(expressjwt({
	secret: JWTsecretKey,
	algorithms: [algorithm],
	getToken(req) {
		return req.cookies.token;
	}
}), (err: Error, req: Request, res: Response, next: NextFunction) => {
	res.status(401).json({
		status: 401,
		msg: "用户身份验证失败"
	})
});
wallet.post('/', getWallet);
router.use('/wallet', wallet);

export default router;