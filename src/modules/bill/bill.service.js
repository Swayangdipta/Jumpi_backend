import ApiError from "../../utils/ApiError.js";

import {
    findCustomerForDashboard
} from "../customer/customer.queries.js";

import {
    findBillsByMobile,
    countBillsByMobile,
    findBillById
} from "./bill.queries.js";

import {
    mapBill,
    mapBillDetails
} from "./bill.mapper.js";


export const getBillHistory = async ({
    customerId,
    page,
    limit,
    offset
}) => {

    const customer =
        await findCustomerForDashboard(customerId);

    if (!customer) {
        throw new ApiError(
            404,
            "Customer profile not found."
        );
    }


    const [
        bills,
        total
    ] = await Promise.all([
        findBillsByMobile({
            mobile: customer.mobile,
            limit,
            offset
        }),

        countBillsByMobile(
            customer.mobile
        )
    ]);


    const totalPages =
        total === 0
            ? 0
            : Math.ceil(total / limit);


    return {
        bills: bills.map(mapBill),

        pagination: {
            page,
            limit,
            total,
            totalPages,

            hasNextPage:
                page < totalPages,

            hasPreviousPage:
                page > 1
        }
    };
};


export const getBillDetails = async ({
    customerId,
    billId
}) => {

    const customer =
        await findCustomerForDashboard(customerId);

    if (!customer) {
        throw new ApiError(
            404,
            "Customer profile not found."
        );
    }


    const bill = await findBillById({
        billId,
        mobile: customer.mobile
    });


    if (!bill) {
        throw new ApiError(
            404,
            "Bill not found."
        );
    }


    return mapBillDetails(bill);
};