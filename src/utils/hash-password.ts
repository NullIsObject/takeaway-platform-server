import md5 from "md5";

export default function ({ userName, password }: { userName: string, password: string }) {
	return md5(userName + password)
}