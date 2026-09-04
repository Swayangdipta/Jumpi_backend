import * as BookingsService
    from "./booking.service.js";

import {
    getPagination
} from "../../utils/pagination.js";

import {
    successResponse
} from "../../utils/response.js";

import ApiError
    from "../../utils/ApiError.js";


export const getNextBooking = async (
    req,
    res,
    next
) => {

    try {

        const booking =
            await BookingsService.getNextBooking({
                customerId: req.user.cid
            });


        return successResponse(
            res,
            "Next booking fetched successfully.",
            booking
        );

    } catch (error) {

        next(error);

    }
};


export const getBookingHistory = async (
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
            await BookingsService.getBookingHistory({
                customerId: req.user.cid,
                page,
                limit,
                offset
            });


        return successResponse(
            res,
            "Bookings fetched successfully.",
            result.bookings,
            result.pagination,
        );

    } catch (error) {
        console.error("Error fetching booking history:", error);
        next(error);

    }
};


export const getBookingDetails = async (
    req,
    res,
    next
) => {

    try {

        const bookingId =
            Number.parseInt(
                req.params.id,
                10
            );


        if (
            !Number.isInteger(bookingId) ||
            bookingId <= 0
        ) {
            throw new ApiError(
                400,
                "Invalid booking ID."
            );
        }


        const booking =
            await BookingsService.getBookingDetails({
                customerId: req.user.cid,
                bookingId
            });


        return successResponse(
            res,
            "Booking fetched successfully.",
            booking
        );

    } catch (error) {

        next(error);

    }
};