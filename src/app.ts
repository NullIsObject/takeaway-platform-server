import path from 'path';
import express from 'express';
import { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import indexRouter from './routes/index';
import userRouter from './routes/user';
import discountRouter from "./routes/discount";
const app = express();
// view模板路径和后缀设置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//中间件和路由
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/discount', discountRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	res.status(500).json({
		status: 500,
		msg: "服务器出错"
	});
})

export default app