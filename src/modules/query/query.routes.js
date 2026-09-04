import express from "express";

import authMiddleware
    from "../../middleware/auth.middleware.js";

import {
    getQueryHistory,
    getQueryDetails
} from "./query.controller.js";


const router = express.Router();


router.get(
    "/history",
    authMiddleware,
    getQueryHistory
);


router.get(
    "/:id",
    authMiddleware,
    getQueryDetails
);


export default router;