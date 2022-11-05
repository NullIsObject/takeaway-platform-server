import express from 'express';
import { register, login, changePassword, getWallet } from "@/controller/user";
import { tokenVerify, tokenContentVerify, errorMiddleWare } from "@/utils/useTokenVerify";

const router = express.Router();
const wallet = express.Router();
router.post('/', function (req, res, next) {
	res.send('/user');
});

router.post('/register', register);
router.post('/login', login);
router.post('/password', changePassword);
wallet.use(tokenVerify, tokenContentVerify, errorMiddleWare);//token验证
wallet.post('/', getWallet);
router.use('/wallet', wallet);

export default router;