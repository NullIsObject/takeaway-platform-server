import express from 'express';
import { register, login, changePassword } from "@/controller/user";
const router = express.Router();
router.post('/', function (req, res, next) {
	res.send('user');
});
router.post('/login', login);
router.post('/register', register);
router.post('/change', changePassword);

export default router;