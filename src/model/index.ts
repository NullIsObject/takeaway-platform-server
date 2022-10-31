import mysql from 'mysql';
import { MysqlError, FieldInfo, QueryOptions, queryCallback } from "mysql";
import { mysqlConfig } from '@/config';
import hashPassword from "@/utils/hash-password";
import createId from '@/utils/createId';

type SqlCallBack = (error: MysqlError | null, results: any, fields: FieldInfo[] | undefined) => void;
type UserNamePassword = {
	userName: string,
	password: string
}

const pool = mysql.createPool(mysqlConfig);

export const query = (sql: QueryOptions | string, arr: any[]) => {
	return new Promise((resolve, reject) => {
		pool.query(sql, arr, (err, results, fields) => {
			if (err) reject();
			resolve(results);
		})
	})
};

// export const addUser = ({ userName, password }: UserNamePassword, callBack: SqlCallBack) => {
// 	// 添加用户
// 	const id = createId(),
// 		createTime = Date.now();
// 	const sql =
// 		`INSERT INTO user_info(id,user_name,password,create_time,update_time)
// 			VALUES( ? , ? , ? , ? , ? )`;
// 	password = hashPassword({ userName, password });
// 	query(sql, [id, userName, password, createTime, createTime], callBack)
// }
// export const userSelect = ({ userName, password }: UserNamePassword, callBack: queryCallback) => {
// 	// 查询用户是否存在，根据queryCallback的results判断
// 	const sql = `SELECT user_name,password FROM user_info
// 	WHERE user_name = ? AND password= ?`;
// 	password = hashPassword({ userName, password });
// 	query(sql, [userName, password], callBack);
// }

// export const userChangePassword = ({ userName, password, newPassword }: UserNamePassword & { newPassword: string }, callBack: (isSuccess: boolean, msg: string) => any) => {
// 	//修改密码，根据isSuccess参数判断是否成功
// 	//!!!不要返回msg参数到客户端，该参数仅用于调试
// 	userSelect({ userName, password }, (err, results, fields) => {
// 		if (err) {
// 			callBack(false, "数据库出错");
// 			return;
// 		}
// 		if (results.length === 0) {
// 			callBack(false, "用户不存在");
// 			return;
// 		}
// 		const password = (hashPassword({ userName, password: newPassword }));
// 		const sql = `UPDATE user_info
// 		SET password = ?
// 		WHERE user_name = ? `;
// 		query(sql, [password, userName], (err, results, fields) => {
// 			if (err) {
// 				callBack(false, "数据库出错");
// 				return;
// 			} else {
// 				callBack(true, "成功");
// 				return;
// 			}
// 		})
// 	})
// }

// export const selectUserWallet = ({ userName }: { userName: string }, callBack: SqlCallBack) => {
// 	// 查询用户钱包信息
// 	const sql = `SELECT money,score,discounts FROM user_wallet w
// 	JOIN user_info u ON w.id=u.id
// 	WHERE user_name= ?`;
// 	query(sql, [userName], callBack);
// }

// export const selectUserDiscounts = ({ id }: { id: string }, callBack: SqlCallBack) => {
// 	// 根据id查看优惠券
// 	const sql = `SELECT name,msg,indate FROM discounts
// 	WHERE id= ? `;
// 	query(sql, [id], callBack);
// }