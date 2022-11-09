import { decode } from "jsonwebtoken"
import { Request } from "express"
export const getUserId = (req: Request): string | false => {
	const userToken: any = decode(req.cookies.token)
	if (!userToken.userId) return false
	return String(userToken.userId)
}
export default getUserId