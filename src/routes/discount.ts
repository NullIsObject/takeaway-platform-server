import express from 'express';
import { coupon } from "@/controller/discount";
const router = express.Router();
router.use('/coupon', coupon);

export default router;