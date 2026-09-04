import db from "../../database/db.js";


export const findVoucherHistory = async ({
  customerId,
  limit,
  offset
}) => {
  const [rows] = await db.execute(
    `
    SELECT
      v.voucher,

      MIN(v.date) AS date,
      MIN(v.expiry) AS expiry,

      MIN(v.customer) AS customer_id,

      MIN(v.pmode) AS payment_mode,
      MIN(v.salesman) AS salesman,

      MIN(v.mainref) AS activity_id,

      act.name AS activity_name,
      act.atype AS activity_type,
      act.charge AS activity_charge,

      c.name AS customer_name,
      c.mobile AS customer_mobile,
      c.email AS customer_email,

      COUNT(*) AS total_vouchers,

      SUM(
        CASE
          WHEN v.status = '1' THEN 0
          ELSE 1
        END
      ) AS used_vouchers,

      SUM(
        CASE
          WHEN v.status = '1' THEN 1
          ELSE 0
        END
      ) AS unused_vouchers

    FROM vouchers v

    INNER JOIN customer c
      ON v.customer = c.cid

    LEFT JOIN activity act
      ON v.mainref = act.id

    WHERE v.customer = ?

    GROUP BY
      v.voucher,
      act.name,
      act.atype,
      act.charge,
      c.name,
      c.mobile,
      c.email

    ORDER BY MIN(v.id) DESC

    LIMIT ? OFFSET ?
    `,
    [customerId, limit, offset]
  );

  return rows;
};


export const countVoucherGroups = async (customerId) => {
  const [rows] = await db.execute(
    `
    SELECT COUNT(*) AS total
    FROM (
      SELECT voucher
      FROM vouchers
      WHERE customer = ?
      GROUP BY voucher
    ) AS voucher_groups
    `,
    [customerId]
  );

  return Number(rows[0]?.total || 0);
};


export const findVoucherDetails = async ({
  customerId,
  voucherNumber
}) => {
  const [rows] = await db.execute(
    `
    SELECT
      v.id,
      v.date,
      v.expiry,
      v.customer,

      v.mainref,
      v.activity,
      v.vcid,

      v.voucher,
      v.code,
      v.otp,

      v.pmode,
      v.salesman,
      v.vtype,
      v.status,

      act.id AS activity_id,
      act.name AS activity_name,
      act.atype AS activity_type,
      act.charge AS activity_charge

    FROM vouchers v

    LEFT JOIN activity act
      ON v.mainref = act.id

    WHERE v.customer = ?
      AND v.voucher = ?

    ORDER BY v.id ASC
    `,
    [customerId, voucherNumber]
  );

  return rows;
};


export const findVoucherUsage = async (voucherIds) => {
  if (!voucherIds.length) {
    return [];
  }

  const placeholders = voucherIds.map(() => "?").join(",");

  const [rows] = await db.execute(
    `
    SELECT
      b.bid,
      b.subvoucher,
      b.date,
      b.time,
      b.endtime

    FROM booking b

    WHERE b.subvoucher IN (${placeholders})

    ORDER BY b.date DESC, b.bid DESC
    `,
    voucherIds
  );

  return rows;
};