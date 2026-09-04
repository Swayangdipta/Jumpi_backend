import * as CustomerService from "./customer.service.js";

import {
    successResponse
} from "../../utils/response.js";

export const getProfile = async (req, res, next) => {

    try {

        const profile =
            await CustomerService.getProfile(
                req.user.cid
            );

        return successResponse(
            res,
            "Customer profile fetched successfully.",
            profile
        );

    } catch (error) {

        next(error);

    }
};

export const getDashboard = async (req, res, next) => {

    try {

        const dashboard =
            await CustomerService.getDashboard(
                req.user.cid
            );

        console.log("Dashboard:", dashboard);

        return successResponse(
            res,
            "Dashboard fetched successfully.",
            dashboard
        );

    } catch (error) {

        next(error);

    }
};