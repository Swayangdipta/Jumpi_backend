import express from "express";

import authMiddleware
    from "../../middleware/auth.middleware.js";

import {
    getNextBooking,
    getBookingHistory,
    getBookingDetails
} from "./booking.controller.js";


const router = express.Router();


router.get(
    "/next",
    authMiddleware,
    getNextBooking
);


router.get(
    "/history",
    authMiddleware,
    getBookingHistory
);


router.get(
    "/:id",
    authMiddleware,
    getBookingDetails
);


export default router;