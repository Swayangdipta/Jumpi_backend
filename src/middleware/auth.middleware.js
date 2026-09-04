import ApiError from "../utils/ApiError.js";

import { verifyToken } from "../services/jwt.service.js";

import * as AuthQuery from "../modules/auth/auth.queries.js";

const authMiddleware = async (req, res, next) => {

    try {

        const authorization = req.headers.authorization;

        if (!authorization) {
            throw new ApiError(401, "Authorization token is required.");
        }

        if (!authorization.startsWith("Bearer ")) {
            throw new ApiError(401, "Invalid authorization format.");
        }

        const token = authorization.split(" ")[1];

        const payload = verifyToken(token);

        const customer = await AuthQuery.findCustomerById(payload.cid);

        if (!customer) {
            throw new ApiError(401, "Invalid authentication token.");
        }

        req.user = customer;

        next();

    } catch (error) {

        next(error);

    }

};

export default authMiddleware;