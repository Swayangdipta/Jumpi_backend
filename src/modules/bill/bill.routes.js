import express from "express";

import authMiddleware
    from "../../middleware/auth.middleware.js";

import {
    getBillHistory,
    getBillDetails
} from "./bill.controller.js";


const router = express.Router();


router.get(
    "/history",
    authMiddleware,
    getBillHistory
);


router.get(
    "/:id",
    authMiddleware,
    getBillDetails
);


export default router;