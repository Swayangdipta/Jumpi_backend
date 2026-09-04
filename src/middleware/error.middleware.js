import { errorResponse } from "../utils/response.js";

export default (err, req, res, next) => {

    console.error({

        message: err.message,

        stack: err.stack,

        path: req.originalUrl,

        method: req.method

    });

    return errorResponse(

        res,

        err.message || "Internal Server Error",

        err.statusCode || 500

    );

};