import db from "../../database/db.js";

/**
 * Get paginated queries belonging to a customer.
 *
 * Legacy relationship:
 *
 * customer.mobile -> query.mobile
 *
 * The query table does NOT contain customer cid.
 */
export const findQueriesByMobile = async ({
    mobile,
    limit,
    offset
}) => {
    const [rows] = await db.execute(
        `
        SELECT
            id,
            date,
            time,
            queryno,

            bdate,

            name,
            mobile,
            email,
            address,

            kname,
            dob,

            noofprts,
            noofkids,

            notes,
            event_type,
            lead_source,

            status
        FROM query
        WHERE mobile = ?
        ORDER BY date DESC, id DESC
        LIMIT ? OFFSET ?
        `,
        [mobile, limit, offset]
    );

    return rows;
};


/**
 * Count total queries belonging to the customer.
 */
export const countQueriesByMobile = async (mobile) => {
    const [rows] = await db.execute(
        `
        SELECT COUNT(*) AS total
        FROM query
        WHERE mobile = ?
        `,
        [mobile]
    );

    return Number(rows[0]?.total || 0);
};


/**
 * Get one query belonging to the customer.
 *
 * Both id and mobile are checked.
 * This prevents a customer from accessing another
 * customer's query simply by knowing its ID.
 */
export const findQueryById = async ({
    queryId,
    mobile
}) => {
    const [rows] = await db.execute(
        `
        SELECT
            id,
            date,
            time,

            aby,
            staff,

            queryno,
            bdate,

            name,
            mobile,
            email,
            address,

            kname,
            dob,

            noofprts,
            noofkids,

            notes,
            event_type,
            lead_source,

            assignedby,
            assignedto,

            status
        FROM query
        WHERE id = ?
          AND mobile = ?
        LIMIT 1
        `,
        [queryId, mobile]
    );

    return rows[0] || null;
};