import * as VoucherService from "./voucher.service.js";

import {
  getPagination
} from "../../utils/pagination.js";

import {
  successResponse
} from "../../utils/response.js";

import ApiError from "../../utils/ApiError.js";


export const getVoucherHistory = async (
  req,
  res,
  next
) => {
  try {
    const {
      page,
      limit,
      offset
    } = getPagination(req.query);

    const result =
      await VoucherService.getVoucherHistory({
        customerId: req.user.cid,
        page,
        limit,
        offset
      });

    return successResponse(
      res,
      "Vouchers fetched successfully.",
      result.vouchers,
      result.pagination
    );
  } catch (error) {
    next(error);
  }
};


export const getVoucherDetails = async (
  req,
  res,
  next
) => {
  try {
    const voucherNumber =
      req.params.voucherNumber;

    if (
      !voucherNumber ||
      !voucherNumber.trim()
    ) {
      throw new ApiError(
        400,
        "Invalid voucher number."
      );
    }

    const voucher =
      await VoucherService.getVoucherDetails({
        customerId: req.user.cid,
        voucherNumber
      });

    return successResponse(
      res,
      "Voucher details fetched successfully.",
      voucher
    );
  } catch (error) {
    next(error);
  }
};