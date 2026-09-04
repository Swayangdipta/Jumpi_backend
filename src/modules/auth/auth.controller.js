import asyncHandler from "../../utils/asyncHandler.js";
import * as AuthService from "./auth.service.js";
import { successResponse } from "../../utils/response.js";

export const register = asyncHandler(async (req, res) => {

    const customer = await AuthService.register(req.body);

    return successResponse(
        res,
        "Registration successful. Please login.",
        customer,
        201
    );

});

export const login = asyncHandler(async (req, res) => {

    const response = await AuthService.forceLogin(req.body);

    return successResponse(
        res,
        response.message,
        response.data
    );

});

export const resendOtp = asyncHandler(async (req, res) => {

    const response =
        await AuthService.resendOtp(req.body);

    return successResponse(
        res,
        response.message
    );

});

export const verifyOtp = asyncHandler(async (req, res) => {

    const response = await AuthService.verifyOtp(req.body);

    return successResponse(
        res,
        response.message,
        response.data
    );

});

export const me = asyncHandler(async (req, res) => {

    const customer = await AuthService.me(req.user);

    return successResponse(
        res,
        "Customer fetched successfully.",
        customer
    );

});

export const logout = asyncHandler(async (req, res) => {

    await AuthService.logout();

    return successResponse(
        res,
        "Logged out successfully."
    );

});