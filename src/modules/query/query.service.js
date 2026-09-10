import ApiError from "../../utils/ApiError.js";

import {
    findCustomerForDashboard
} from "../customer/customer.queries.js";

import {
    findQueriesByMobile,
    countQueriesByMobile,
    findQueryById,
    insertQuery
} from "./query.queries.js";

import {
    mapQuery,
    mapQueryDetails
} from "./query.mapper.js";


export const getQueryHistory = async ({
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
        queries,
        total
    ] = await Promise.all([
        findQueriesByMobile({
            mobile: customer.mobile,
            limit,
            offset
        }),

        countQueriesByMobile(
            customer.mobile
        )
    ]);


    const totalPages =
        total === 0
            ? 0
            : Math.ceil(total / limit);


    return {
        queries: queries.map(mapQuery),

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


export const getQueryDetails = async ({
    customerId,
    queryId
}) => {

    const customer =
        await findCustomerForDashboard(customerId);


    if (!customer) {
        throw new ApiError(
            404,
            "Customer profile not found."
        );
    }


    const query =
        await findQueryById({
            queryId,
            mobile: customer.mobile
        });


    if (!query) {
        throw new ApiError(
            404,
            "Query not found."
        );
    }


    return mapQueryDetails(query);
};

export const createQuery = async (data) => {
    const customer = await findCustomerForDashboard(data.customerId);
    if (!customer) {
        throw new ApiError(404, "Customer profile not found.");
    }
    const mobile = customer.mobile;

    const queryId = await insertQuery({
        name: data.name,
        email: data.email,
        mobile: data.mobile || mobile,
        address: data.address,
        notes: data.message
    });

    return { id: queryId };
};