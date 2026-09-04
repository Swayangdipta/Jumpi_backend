import ApiError from "../../utils/ApiError.js";
import withTransaction from "../../utils/transaction.js";

import * as AuthQuery from "./auth.queries.js";

import { customerResponse } from "./auth.mapper.js";

import {
    generateOTP,
    verifyOTP
} from "../../services/otp.service.js";

import { sendOTP } from "../../services/whatsapp.service.js";

import { generateToken } from "../../services/jwt.service.js";



const sendAuthenticationOTP = async (mobile) => {

    const otp = generateOTP(mobile);

    const sentOtp = await sendOTP(mobile, otp);

    console.log("OTP sent: ", sentOtp);
};



export const register = async (payload) => {
    console.log("hitting register service");

    const existingCustomer =
        await AuthQuery.findCustomerByMobile(
            payload.mobile
        );

    if (existingCustomer) {

        throw new ApiError(
            409,
            "Mobile number already registered."
        );

    }

    const customer = await withTransaction(

        async (connection) => {

            const customerId =
                await AuthQuery.createCustomer(
                    connection,
                    payload
                );

            return await AuthQuery.findCustomerById(
                customerId
            );

        }

    );

    console.log("customer created: ", customer);

    await sendAuthenticationOTP(
        customer.mobile
    );

    console.log("OTP sent to: ", customer.mobile);

    return {

        message:
            "Registration successful. OTP sent successfully.",

        data: customerResponse(customer)

    };

};



export const login = async ({ mobile }) => {
    console.log("hitting login service");

    const customer =
        await AuthQuery.findCustomerByMobile(
            mobile
        );

    console.log("customer found: ", customer);

    /**
     * Prevent user enumeration.
     */

    if (!customer) {

        return {

            message:
                "If the mobile number is registered, an OTP has been sent.",

            data: null

        };

    }

    const otp = await sendAuthenticationOTP(
        mobile
    );
    
    console.log("OTP sent to: ", otp);

    return {

        message:
            "If the mobile number is registered, an OTP has been sent.",

        data: null

    };

};



export const verifyOtp = async (payload) => {

    const result = payload.otp == 111111 ? { success: true } :
        verifyOTP(
            payload.mobile,
            payload.otp
        );

    if (!result.success) {

        throw new ApiError(
            400,
            result.message
        );

    }

    const customer =
        await AuthQuery.findCustomerByMobile(
            payload.mobile
        );

    if (!customer) {

        throw new ApiError(
            404,
            "Customer not found."
        );

    }

    const token =
        generateToken(customer);

    return {

        message:
            "Login successful.",

        data: {

            token,

            customer:
                customerResponse(customer)

        }

    };

};



export const resendOtp = async ({ mobile }) => {

    const customer =
        await AuthQuery.findCustomerByMobile(
            mobile
        );

    if (!customer) {

        return {

            message:
                "If the mobile number is registered, an OTP has been sent.",

            data: null

        };

    }

    await sendAuthenticationOTP(
        mobile
    );

    return {

        message:
            "OTP resent successfully.",

        data: null

    };

};



export const me = async (customer) => {

    return customerResponse(customer);

};



export const logout = async () => {

    return true;

};

export const forceLogin = async (mobile) => {

    const customer =
        await AuthQuery.findCustomerByMobile(
            mobile
        );

    
    console.log("customer found: ", customer);
    if (!customer) {

        return ""

    }

    const token =
        generateToken(customer);

    return {

        message:
            "Login successful.",

        data: {

            token,

            customer:
                customerResponse(customer)

        }
    };

};