import db from "../../database/db.js";

export const findCustomerProfileById = async (cid) => {
    const [rows] = await db.execute(
        `
        SELECT
            cid,
            name,
            mobile,
            email,
            Address,
            dob,
            cardno,
            expiry,
            pack,
            pmode,
            amount,
            cstatus,
            status
        FROM customer
        WHERE cid = ?
        LIMIT 1
        `,
        [cid]
    );

    return rows[0] || null;
};

/**
 * Get customer information needed by the dashboard.
 */
export const findCustomerForDashboard = async (cid) => {
    const [rows] = await db.execute(
        `
        SELECT
            cid,
            name,
            mobile,
            email,
            pack,
            cardno,
            expiry,
            nextfdate,
            nextftime,
            fdstatus,
            cstatus,
            status
        FROM customer
        WHERE cid = ?
        LIMIT 1
        `,
        [cid]
    );

    return rows[0] || null;
};


/**
 * Count Total Activity from booking table where status=1
 */
export const countActiveBookings = async (customerId) => {
    const [rows] = await db.execute(
        `
        SELECT COUNT(*) AS total
        FROM booking
        WHERE cusref = ?
          AND status = 1
        `,
        [String(customerId)]
    );

    return Number(rows[0]?.total || 0);
};


/**
 * Count Birthday Parties from bill table where status=1
 */
export const countPartyFiles = async (mobile) => {
    const [rows] = await db.execute(
        `
        SELECT COUNT(*) AS total
        FROM bill
        WHERE mobile = ?
          AND status = 1
        `,
        [mobile]
    );

    return Number(rows[0]?.total || 0);
};


/**
 * Count open customer queries.
 */
export const countOpenQueries = async (mobile) => {
    const [rows] = await db.execute(
        `
        SELECT COUNT(*) AS total
        FROM query
        WHERE mobile = ?
          AND status != 'closed'
        `,
        [mobile]
    );

    return Number(rows[0]?.total || 0);
};

/**
 * Find stores for dashboard
 */
export const findStores = async () => {
    const [rows] = await db.execute(
        `
        SELECT name
        FROM admin
        WHERE type = 'store' AND status = 1
        `
    );

    return rows || [];
};

/**
 * Get the customer's next upcoming booking.
 */
export const findNextVisit = async (customerId) => {
    // keeping it just in case, though it's removed from dashboard UI
    const [rows] = await db.execute(
        `
        SELECT
            bid,
            bookid,
            date,
            time,
            endtime,
            strtime,
            duration,
            pack,
            cusname
        FROM booking
        WHERE cusref = ?
          AND date >= CURDATE()
          AND cancellation_flag = 0
        ORDER BY date ASC, bid ASC
        LIMIT 1
        `,
        [String(customerId)]
    );

    return rows[0] || null;
};


/**
 * Get the latest bill for the dashboard.
 */
export const findLatestBill = async (mobile) => {
    const [rows] = await db.execute(
        `
        SELECT
            blid,
            date,
            time,
            bkngno,
            fblno,
            event_type,
            net,
            finalamt,
            advance,
            pending,
            payment_mode,
            status
        FROM bill
        WHERE mobile = ?
        ORDER BY date DESC, blid DESC
        LIMIT 1
        `,
        [mobile]
    );

    return rows[0] || null;
};


/**
 * Calculate the total pending amount across the customer's bills.
 */
export const getPendingAmount = async (mobile) => {
    const [rows] = await db.execute(
        `
        SELECT
            COALESCE(
                SUM(
                    CASE
                        WHEN pending REGEXP '^-?[0-9]+(\\.[0-9]+)?$'
                        THEN CAST(pending AS DECIMAL(12,2))
                        ELSE 0
                    END
                ),
                0
            ) AS pendingAmount
        FROM bill
        WHERE mobile = ?
        `,
        [mobile]
    );

    return Number(rows[0]?.pendingAmount || 0);
};


/**
 * Get the latest party/event information.
 */
export const findLatestEvent = async (mobile) => {
    const [rows] = await db.execute(
        `
        SELECT
            blid,
            event_type,
            bdate,
            fdate,
            ftime,
            tslot,
            theme,
            status
        FROM bill
        WHERE mobile = ?
          AND event_type IS NOT NULL
          AND event_type <> ''
        ORDER BY
            COALESCE(fdate, STR_TO_DATE(bdate, '%Y-%m-%d')) DESC,
            blid DESC
        LIMIT 1
        `,
        [mobile]
    );

    return rows[0] || null;
};