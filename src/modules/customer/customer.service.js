import ApiError from "../../utils/ApiError.js";

import * as CustomerQuery from "./customer.queries.js";

import {
    customerProfileResponse,
    dashboardResponse
} from "./customer.mapper.js";


export const getProfile = async (cid) => {
    const customer =
        await CustomerQuery.findCustomerForDashboard(cid);

    if (!customer) {
        throw new ApiError(
            404,
            "Customer profile not found."
        );
    }

    return customerProfileResponse(customer);
};


export const getDashboard = async (cid) => {

    console.log(cid)

    const customer =
        await CustomerQuery.findCustomerForDashboard(cid);

    if (!customer) {
        throw new ApiError(
            404,
            "Customer profile not found."
        );
    }


    /*
     * These queries are independent, so execute them
     * concurrently instead of waiting for each one sequentially.
     */
    const [
        activeBookings,
        nextVisit,
        partyFiles,
        openQueries,
        latestBill,
        pendingAmount,
        latestEvent
    ] = await Promise.all([
        CustomerQuery.countActiveBookings(cid),

        CustomerQuery.findNextVisit(cid),

        CustomerQuery.countPartyFiles(
            customer.mobile
        ),

        CustomerQuery.countOpenQueries(
            customer.mobile
        ),

        CustomerQuery.findLatestBill(
            customer.mobile
        ),

        CustomerQuery.getPendingAmount(
            customer.mobile
        ),

        CustomerQuery.findLatestEvent(
            customer.mobile
        )
    ]);


    return dashboardResponse({
        customer,
        activeBookings,
        nextVisit,
        partyFiles,
        openQueries,
        pendingAmount,
        latestBill,
        latestEvent
    });
};