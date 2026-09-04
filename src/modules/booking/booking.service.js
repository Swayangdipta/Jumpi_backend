import ApiError from "../../utils/ApiError.js";

import {
    findCustomerForDashboard
} from "../customer/customer.queries.js";

import {
    findNextBooking,
    findBookingHistory,
    countBookings,
    findBookingById
} from "./booking.queries.js";

import {
    mapBooking,
    mapBookingDetails
} from "./booking.mapper.js";


const getCustomer = async (customerId) => {
    const customer =
        await findCustomerForDashboard(customerId);

    if (!customer) {
        throw new ApiError(
            404,
            "Customer profile not found."
        );
    }

    return customer;
};


/**
 * Get next upcoming booking.
 */
export const getNextBooking = async ({ customerId }) => {
    await getCustomer(customerId);

    const booking = await findNextBooking(customerId);

    if (!booking) {
        return null;
    }

    return mapBooking(booking);
};


/**
 * Get booking history.
 */
export const getBookingHistory = async ({
    customerId,
    page,
    limit,
    offset
}) => {

    await getCustomer(customerId);

    const [
        bookings,
        total
    ] = await Promise.all([
        findBookingHistory({
            customerId,
            limit,
            offset
        }),

        countBookings(customerId)
    ]);


    const totalPages =
        total === 0
            ? 0
            : Math.ceil(total / limit);


    return {
        bookings: bookings.map(mapBooking),

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


/**
 * Get booking details.
 */
export const getBookingDetails = async ({
    customerId,
    bookingId
}) => {

    await getCustomer(customerId);

    const booking =
        await findBookingById({
            bookingId,
            customerId
        });


    if (!booking) {
        throw new ApiError(
            404,
            "Booking not found."
        );
    }


    return mapBookingDetails(booking);
};