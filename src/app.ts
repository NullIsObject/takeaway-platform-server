import path from 'path';
import express from 'express';
import indexRouter from './routes/index';
import userRouter from './routes/user';
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import { expressjwt } from "express-jwt";
const app = express();
import { token } from "@/config";
const { JWTsecretKey, algorithm } = token;
// view模板路径和后缀设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//中间件和路由
app.use(cors());
app.use(cookieParser());
// app.use(expressjwt({
// 	secret: JWTsecretKey,
// 	algorithms: [algorithm],
// 	getToken(req) {
// 		return req.cookies.token;
// 	}
// }).unless({ path: [/^\/user\/.*/] }));
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/user', userRouter);

export default app