import * as QueriesService
    from "./query.service.js";

import {
    getPagination
} from "../../utils/pagination.js";

import {
    successResponse
} from "../../utils/response.js";

import ApiError
    from "../../utils/ApiError.js";


export const getQueryHistory = async (
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
            await QueriesService.getQueryHistory({
                customerId: req.user.cid,
                page,
                limit,
                offset
            });


        return successResponse(
            res,
            "Queries fetched successfully.",
            result.queries,
            result.pagination
        );

    } catch (error) {

        next(error);

    }
};


export const getQueryDetails = async (
    req,
    res,
    next
) => {

    try {

        const queryId =
            Number.parseInt(
                req.params.id,
                10
            );


        if (
            !Number.isInteger(queryId) ||
            queryId <= 0
        ) {
            throw new ApiError(
                400,
                "Invalid query ID."
            );
        }


        const query =
            await QueriesService.getQueryDetails({
                customerId: req.user.cid,
                queryId
            });


        return successResponse(
            res,
            "Query fetched successfully.",
            query
        );

    } catch (error) {

        next(error);

    }
};