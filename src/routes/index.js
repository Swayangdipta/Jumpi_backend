import { Router } from "express";

import authRoutes from "../modules/auth/auth.routes.js";

import customerRoutes from "../modules/customer/customer.routes.js";

import billsRoutes from "../modules/bill/bill.routes.js";

import queriesRoutes from "../modules/query/query.routes.js";

import bookingRoutes from "../modules/booking/booking.routes.js";

import voucherRoutes from "../modules/voucher/voucher.routes.js";

import db from "../database/db.js";

const router = Router();

router.use("/auth", authRoutes);

router.use("/customer",customerRoutes);

router.use("/bills",billsRoutes);

router.use("/queries",queriesRoutes);

router.use("/bookings",bookingRoutes);

router.use("/vouchers", voucherRoutes);

router.get("/", (req, res) => {

    res.json({

        success: true,

        app: "JusJumpin Customer API",

        version: "1.0.0"

    });

});

router.get("/health", async (req, res) => {

    try {

        await db.execute("SELECT 1");

        return res.json({

            success: true,

            database: "Connected"

        });

    }
    catch {

        return res.status(500).json({

            success: false,

            database: "Disconnected"

        });

    }

});

export default router;