import mysql from 'mysql';
import { MysqlError, FieldInfo, QueryOptions, queryCallback } from "mysql";
import { mysqlConfig } from '@/config';
import hashPassword from "@/utils/hash-password";
const { escape } = mysql;

type sqlCallBack = (error: MysqlError | null, results: any, fields: FieldInfo[] | undefined) => void;

const pool = mysql.createPool(mysqlConfig);

export const query = (sql: QueryOptions | string, callBack: queryCallback) => {
	pool.query(sql, (err, results, fields) => {
		callBack(err, results, fields)
	})
};

export const addUser = ({ userName, password }: { userName: string, password: string }, callBack: sqlCallBack) => {
	// 添加用户
	const id = Number.parseInt(String(Math.random() * 100000)),
		createTime = Date.now();
	const sql =
		`INSERT INTO user_info(id,user_name,password,create_time,update_time)
			VALUES(${escape(id)},${escape(userName)},${escape(password)},${escape(createTime)},${escape(createTime)});`;
	query(sql, callBack)
}
export const userSelect = ({ userName, password }: { userName: string, password: string }, callBack: queryCallback) => {
	// 查询用户是否存在，根据queryCallback的results判断
	const sql = `SELECT user_name,password FROM user_info
	WHERE user_name = '${userName}' AND password='${password}'`;
	query(sql, callBack);
}

export const userChangePassword = ({ userName, password, newPassword }: { userName: string, password: string, newPassword: string }, callBack: (isSuccess: boolean, msg: string) => any) => {
	//修改密码，根据isSuccess参数判断是否成功
	userSelect({ userName, password }, (err, results, fields) => {
		if (err) {
			callBack(false, "数据库出错");
			return;
		}
		if (results.length === 0) {
			callBack(false, "用户不存在");
			return;
		}
		const password = (hashPassword({ userName, password: newPassword }));
		const sql = `UPDATE user_info
		SET password='${password}'
		WHERE user_name='${userName}'`;
		query(sql, (err, results, fields) => {
			if (err) {
				callBack(false, "数据库出错");
				return;
			} else {
				callBack(true, "成功");
				return;
			}
		})
	})
}