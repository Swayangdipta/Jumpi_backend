export const successResponse = (
    res,
    message,
    data = null,
    pagination
) => {

    return res.status(200).json({

        success: true,

        message,

        data,

        pagination

    });

};

export const errorResponse = (
    res,
    message,
    status = 500,
    errors = null
) => {

    return res.status(status).json({

        success: false,

        message,

        errors

    });

};