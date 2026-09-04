import db from "../../database/db.js";

const ACTIVITY_FIELDS = `
  act.id AS activity_id,
  act.name AS activity_name,
  act.atype AS activity_type,
  act.category AS activity_category,
  act.timeac AS activity_time,
  act.timeunit AS activity_time_unit,
  act.timemins AS activity_duration,
  act.charge AS activity_charge,
  act.gst AS activity_gst,
  act.status AS activity_status
`;

export const findNextBooking = async (customerId) => {
  const [rows] = await db.execute(
    `
    SELECT
      b.bid,
      b.date,
      b.time,
      b.endtime,

      b.cusref,
      b.cusname,
      b.cusmob,

      b.pack,
      b.voucher,
      b.subvoucher,
      b.carnival,

      b.duration,
      b.bookid,

      b.bkamount,
      b.pmode,

      b.amount,
      b.gst,
      b.total,

      b.qty,
      b.aamount,
      b.agst,
      b.net,

      b.checkout,
      b.status,
      b.mstatus,
      b.reason,

      b.cancellation_flag,
      b.redeem_flag,
      b.qrserial,

      ${ACTIVITY_FIELDS}

    FROM booking b

    LEFT JOIN activity act
      ON b.pack = act.id

    WHERE b.cusref = ?
      AND b.date >= CURDATE()
      AND b.cancellation_flag = 0

    ORDER BY b.date ASC, b.bid ASC

    LIMIT 1
    `,
    [String(customerId)]
  );

  return rows[0] || null;
};


export const findBookingHistory = async ({
  customerId,
  limit,
  offset
}) => {
  const [rows] = await db.execute(
    `
    SELECT
      b.bid,
      b.date,
      b.time,
      b.endtime,

      b.cusref,
      b.cusname,
      b.cusmob,

      b.pack,
      b.voucher,
      b.subvoucher,
      b.carnival,

      b.duration,
      b.bookid,

      b.bkamount,
      b.pmode,

      b.amount,
      b.gst,
      b.total,

      b.qty,
      b.aamount,
      b.agst,
      b.net,

      b.checkout,
      b.status,
      b.mstatus,
      b.reason,

      b.cancellation_flag,
      b.redeem_flag,
      b.qrserial,

      ${ACTIVITY_FIELDS}

    FROM booking b

    LEFT JOIN activity act
      ON b.pack = act.id

    WHERE b.cusref = ?

    ORDER BY b.date DESC, b.bid DESC

    LIMIT ? OFFSET ?
    `,
    [String(customerId), limit, offset]
  );

  return rows;
};


export const countBookings = async (customerId) => {
  const [rows] = await db.execute(
    `
    SELECT COUNT(*) AS total
    FROM booking
    WHERE cusref = ?
    `,
    [String(customerId)]
  );

  return Number(rows[0]?.total || 0);
};


export const findBookingById = async ({
  bookingId,
  customerId
}) => {
  const [rows] = await db.execute(
    `
    SELECT
      b.bid,
      b.date,
      b.aby,
      b.staff,
      b.serial,

      b.time,
      b.endtime,

      b.strtime,
      b.chkotime,
      b.strchkotime,

      b.extntime,
      b.strextime,

      b.chkintime,
      b.strchkintime,

      b.chkouttime,
      b.strchkouttime,

      b.cusref,
      b.cusname,
      b.cusmob,

      b.rfid,

      b.pack,
      b.voucher,
      b.subvoucher,
      b.carnival,

      b.accessories,
      b.accessoriespr,
      b.accessories_pr,
      b.accessoriespr_pr,

      b.duration,
      b.bookid,

      b.bkamount,
      b.pmode,
      b.promocode,

      b.amount,
      b.gst,
      b.total,

      b.qty,

      b.aamount,
      b.agst,
      b.net,

      b.extime,
      b.excharge,

      b.checkout,

      b.feedback,
      b.rating,
      b.printst,

      b.status,
      b.mstatus,
      b.reason,

      b.cctv_checked,
      b.cctv_remarks,

      b.cancdate,
      b.canctime,

      b.rname,
      b.rcctv,
      b.rpin,
      b.rstatus,

      b.pcount,

      b.cancellation_flag,
      b.redeem_flag,

      b.sprint,
      b.sockssl,
      b.qrserial,

      ${ACTIVITY_FIELDS}

    FROM booking b

    LEFT JOIN activity act
      ON b.pack = act.id

    WHERE b.bid = ?
      AND b.cusref = ?

    LIMIT 1
    `,
    [bookingId, String(customerId)]
  );

  return rows[0] || null;
};