import * as BillsService from "./bill.service.js";

import {
    getPagination
} from "../../utils/pagination.js";

import {
    successResponse
} from "../../utils/response.js";

import ApiError from "../../utils/ApiError.js";

export const getBillHistory = async (
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
            await BillsService.getBillHistory({
                customerId: req.user.cid,
                page,
                limit,
                offset
            });


        return successResponse(
            res,
            "Bills fetched successfully.",
            result.bills,
            result.pagination
        );

    } catch (error) {

        next(error);

    }
};


export const getBillDetails = async (
    req,
    res,
    next
) => {

    try {

        const billId =
            Number.parseInt(
                req.params.id,
                10
            );


        if (
            !Number.isInteger(billId) ||
            billId <= 0
        ) {
            throw new ApiError(
                400,
                "Invalid bill ID."
            );
        }


        const bill =
            await BillsService.getBillDetails({
                customerId: req.user.cid,
                billId
            });


        return successResponse(
            res,
            "Bill fetched successfully.",
            bill
        );

    } catch (error) {

        next(error);

    }
};