import mysql from 'mysql';
import { MysqlError, FieldInfo, QueryOptions, queryCallback } from "mysql";
import { mysqlConfig } from '@/config';
import hashPassword from "@/utils/hash-password";
import createId from '@/utils/createId';

type sqlCallBack = (error: MysqlError | null, results: any, fields: FieldInfo[] | undefined) => void;

const pool = mysql.createPool(mysqlConfig);

export const query = (sql: QueryOptions | string, arr: any[], callBack: queryCallback) => {
	pool.query(sql, arr, (err, results, fields) => {
		callBack(err, results, fields)
	})
};

export const addUser = ({ userName, password }: { userName: string, password: string }, callBack: sqlCallBack) => {
	// 添加用户
	const id = createId(),
		createTime = Date.now();
	const sql =
		`INSERT INTO user_info(id,user_name,password,create_time,update_time)
			VALUES( ? , ? , ? , ? , ? )`;
	password = hashPassword({ userName, password });//加密密码
	query(sql, [id, userName, password, createTime, createTime], callBack)
}
export const userSelect = ({ userName, password }: { userName: string, password: string }, callBack: queryCallback) => {
	// 查询用户是否存在，根据queryCallback的results判断
	const sql = `SELECT user_name,password FROM user_info
	WHERE user_name = ? AND password= ?`;
	password = hashPassword({ userName, password });//加密密码
	query(sql, [userName, password], callBack);
}

export const userChangePassword = ({ userName, password, newPassword }: { userName: string, password: string, newPassword: string }, callBack: (isSuccess: boolean, msg: string) => any) => {
	//修改密码，根据isSuccess参数判断是否成功
	//!!!不要返回msg参数到客户端，该参数仅用于调试
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
		SET password = ?
		WHERE user_name = ? `;
		query(sql, [password, userName], (err, results, fields) => {
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