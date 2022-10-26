import { PoolConfig } from 'mysql';
import minimist from 'minimist';
import { Algorithm } from "jsonwebtoken";

const args = minimist(process.argv.slice(2));
// 数据库配置
export const mysqlConfig: PoolConfig = {
	host: 'localhost',
	port: 3306,
	user: 'user1',
	password: '123456',
	database: 'takeaway_platform'
}
//server配置
export const serverConfig = (() => {
	const host = args.host || '127.0.0.1';
	const port = args.port || process.env.PORT || '3000';
	return {
		host,
		port
	}
})()
//token配置
export const token: {
	algorithm: Algorithm,
	JWTsecretKey: string,
	[key: string]: any
} = {
	JWTsecretKey: "secret",//token密钥
	algorithm: 'HS256',//加密方式
	tokenExpiresIn: 1000,//token有效期(单位：s)
}