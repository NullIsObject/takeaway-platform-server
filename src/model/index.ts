import mysql from 'mysql';
import { MysqlError, FieldInfo, QueryOptions, queryCallback } from "mysql";
import { mysqlConfig } from '@/config';
import hashPassword from "@/utils/hash-password";
import createId from '@/utils/createId';

type UserName = {
	userName: string
}

type UserNamePassword = {
	userName: string,
	password: string
}

const pool = mysql.createPool(mysqlConfig);

export const query = (sql: QueryOptions | string, arr: any[]): Promise<any> => {
	return new Promise((resolve, reject) => {
		pool.query(sql, arr, (err, results, fields) => {
			if (err) reject(err);
			resolve(results);
		})
	})
};

export const addUser = ({ userName, password }: UserNamePassword) => {
	// 添加用户
	const id = createId(),
		createTime = Date.now();
	const sql =
		`INSERT INTO user_info(id,user_name,password,create_time,update_time)
			VALUES( ? , ? , ? , ? , ? )`;
	password = hashPassword({ userName, password });
	return query(sql, [id, userName, password, createTime, createTime]);
}

export const userSelect = ({ userName, userId }: { userName?: string, userId?: string }) => {
	// 查询用户信息
	if (userName) {
		const sql = `SELECT id,user_name,name,sex,city,photo FROM user_info
		WHERE user_name = ? `;
		return query(sql, [userName]);
	} else {
		const sql = `SELECT id,user_name,name,sex,city,photo FROM user_info
		WHERE id = ? `;
		return query(sql, [userId]);
	}
}

export const userVerify = ({ userName, password }: UserNamePassword) => {
	// 验证用户密码，根据results长度判断
	password = hashPassword({ userName, password });
	const sql = `SELECT id,user_name,name,sex,city,photo FROM user_info
	WHERE user_name = ? AND password = ?`;
	return query(sql, [userName, password]);
}

export const userChangePassword = ({ userName, newPassword }: UserName & { newPassword: string }) => {
	//修改密码，
	newPassword = (hashPassword({ userName, password: newPassword }));
	const sql = `UPDATE user_info
			SET password = ?
			WHERE user_name = ? `;
	return query(sql, [newPassword, userName]);
}

export const selectUserWallet = ({ id }: { id: string }) => {
	// 查询用户钱包信息
	const sql = `SELECT money,score,discounts FROM user_wallet w
	JOIN user_info u ON w.id=u.id
	WHERE u.id= ?`;
	return query(sql, [id]);
}

export const selectCoupon = (idArr: Array<string>) => {
	// 查询优惠券信息
	let sql = `SELECT id,name,msg,indate FROM discounts
	WHERE id= ? `
	for (let i = 1; i < idArr.length; i++) {
		sql += `OR ?`
	}
	return query(sql, idArr);
}