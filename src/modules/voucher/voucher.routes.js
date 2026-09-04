import express from "express";

import authMiddleware
  from "../../middleware/auth.middleware.js";

import {
  getVoucherHistory,
  getVoucherDetails
} from "./voucher.controller.js";


const router = express.Router();


router.get(
  "/history",
  authMiddleware,
  getVoucherHistory
);


router.get(
  "/:voucherNumber",
  authMiddleware,
  getVoucherDetails
);


export default router;