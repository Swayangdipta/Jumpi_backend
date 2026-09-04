import db from "../../database/db.js";

/**
 * Get paginated bills belonging to a customer.
 *
 * IMPORTANT:
 * bill does not contain customer cid.
 * The legacy relationship is through mobile.
 */
export const findBillsByMobile = async ({
    mobile,
    limit,
    offset
}) => {
    const [rows] = await db.execute(
        `
        SELECT
            blid,
            date,
            time,
            bdate,
            fdate,
            ftime,
            bkngno,
            fblno,
            name,
            mobile,
            email,

            kname,
            dob,
            tslot,
            theme,

            noofprts,
            noofkids,

            features,

            gross,
            gst,
            net,

            finalamt,
            advance,
            pending,

            amode,
            fmode,

            event_type,
            payment_mode,

            discount,
            discount_reason,

            amt_cash,
            amt_upi_online,
            amt_card,
            amt_bank_transfer,

            status,
            accepted,

            clientnote,
            reason
        FROM bill
        WHERE mobile = ?
        ORDER BY date DESC, blid DESC
        LIMIT ? OFFSET ?
        `,
        [mobile, limit, offset]
    );

    return rows;
};


/**
 * Get total number of bills for a customer.
 */
export const countBillsByMobile = async (mobile) => {
    const [rows] = await db.execute(
        `
        SELECT COUNT(*) AS total
        FROM bill
        WHERE mobile = ?
        `,
        [mobile]
    );

    return Number(rows[0]?.total || 0);
};


/**
 * Get one bill.
 *
 * We intentionally require mobile + blid.
 *
 * This prevents:
 *
 * GET /bills/123
 *
 * from returning bill 123 if it belongs to another customer.
 */
export const findBillById = async ({
    billId,
    mobile
}) => {
    const [rows] = await db.execute(
        `
        SELECT
            blid,
            date,
            time,
            aby,
            staff,
            qref,

            bdate,
            fdate,
            ftime,

            bkngno,
            fblno,

            name,
            mobile,
            email,
            address,

            kname,
            dob,
            tslot,
            theme,

            noofprts,
            prtsperamt,
            prtsamt,

            noofkids,
            kidsperamt,
            kidsamt,

            extrappk,
            features,

            gross,
            gst,
            net,
            bsamount,

            minpax,
            finalpax,

            noofkidsfd,
            kidsperamtfd,
            kidsamtfd,

            noofprtsfd,
            prtsperamtfd,
            prtsamtfd,

            drinks,
            starter,
            mcourse,
            dessert,
            lcounter,

            foodamt,
            foodamtfl,
            foodexpn,
            fooddesc,

            finalamt,
            advance,
            pending,

            amode,
            fmode,

            salesperson,
            promocode,

            status,
            accepted,

            clientnote,
            reason,

            event_type,
            payment_mode,

            discount,
            discount_reason,

            amt_cash,
            amt_upi_online,
            amt_card,
            amt_bank_transfer,

            card_digits,
            txn_digits
        FROM bill
        WHERE blid = ?
          AND mobile = ?
        LIMIT 1
        `,
        [billId, mobile]
    );

    return rows[0] || null;
};