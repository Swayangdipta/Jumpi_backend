import db from "../../database/db.js";

/**
 * Find customer by mobile number
 */
export const findCustomerByMobile = async (mobile) => {

    const [rows] = await db.execute(
        `
        SELECT
            cid,
            name,
            email,
            mobile,
            status,
            cstatus
        FROM customer
        WHERE mobile = ?
        LIMIT 1
        `,
        [mobile]
    );

    return rows[0] || null;
};

/**
 * Find all customers by mobile number
 */
export const findCustomersByMobile = async (mobile) => {

    const [rows] = await db.execute(
        `
        SELECT
            cid,
            name,
            email,
            mobile,
            status,
            cstatus
        FROM customer
        WHERE mobile = ?
        `,
        [mobile]
    );

    return rows || [];
};

/**
 * Find customer by id
 */
export const findCustomerById = async (cid) => {

    const [rows] = await db.execute(
        `
        SELECT
            cid,
            name,
            email,
            mobile,
            status,
            cstatus
        FROM customer
        WHERE cid = ?
        LIMIT 1
        `,
        [cid]
    );

    return rows[0] || null;
};

/**
 * Create new customer
 */
export const createCustomer = async (connection, payload) => {

    const [result] = await connection.execute(
        `
        INSERT INTO customer
        (
            date,
            name,
            email,
            mobile,
            status,
            cstatus
        )
        VALUES
        (
            CURDATE(),
            ?,
            ?,
            ?,
            '1',
            '1'
        )
        `,
        [
            payload.name,
            payload.email,
            payload.mobile
        ]
    );

    return result.insertId;
};