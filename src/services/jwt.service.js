import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export const generateToken = (customer) => {

    return jwt.sign(

        {
            cid: customer.cid,
            mobile: customer.mobile
        },

        env.JWT_SECRET,

        {
            expiresIn: env.JWT_EXPIRES_IN
        }

    );

};

export const verifyToken = (token) => {

    return jwt.verify(
        token,
        env.JWT_SECRET
    );

};