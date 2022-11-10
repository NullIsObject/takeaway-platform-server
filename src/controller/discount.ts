import { Middleware } from "@/types";
import { selectCoupon } from "@/model";
import { requestError } from "@/utils/fixedResponse";
export const coupon: Middleware = async (req, res, next) => {
	const ids = req.body.ids;
	let reqVerify = true;
	if (ids instanceof Array) {
		reqVerify = ids.every(val => {
			return !Number.isNaN(Number(val))
		})
	} else {
		reqVerify = false;
	}
	if (!reqVerify) {
		requestError(res)
		return
	}
	const selectCouponResult = await selectCoupon(ids)
	res.status(200).json({
		status: 200,
		msg: "成功",
		data: selectCouponResult
	})
}