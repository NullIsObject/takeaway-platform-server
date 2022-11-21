import { Middleware } from "@/types";
import { selectCoupon } from "@/model";
import { requestError } from "@/utils/fixedResponse";
// 获取优惠券信息
export const coupon: Middleware = async (req, res, next) => {
	const ids = req.body.ids;
	const selectCouponResult = await selectCoupon(ids)
	res.status(200).json({
		status: 200,
		msg: "成功",
		data: selectCouponResult
	})
}