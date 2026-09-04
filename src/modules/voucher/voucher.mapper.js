const mapActivity = (row) => {
  if (row.activity_id == null) {
    return null;
  }

  return {
    id: row.activity_id,
    name: row.activity_name,
    type: row.activity_type,
    charge: row.activity_charge
  };
};


export const mapVoucherHistory = (row) => ({
  voucher: row.voucher,

  date: row.date,
  expiry: row.expiry,

  activity: {
    id: row.activity_id,
    name: row.activity_name,
    type: row.activity_type,
    charge: row.activity_charge
  },

  customer: {
    id: row.customer_id,
    name: row.customer_name,
    mobile: row.customer_mobile,
    email: row.customer_email
  },

  paymentMode: row.payment_mode,
  salesman: row.salesman,

  totalVouchers: Number(row.total_vouchers),
  usedVouchers: Number(row.used_vouchers),
  unusedVouchers: Number(row.unused_vouchers)
});


export const mapVoucherDetails = ({
  rows,
  usage
}) => {
  if (!rows.length) {
    return null;
  }

  const first = rows[0];

  const usageMap = new Map();

  for (const booking of usage) {
    if (!usageMap.has(String(booking.subvoucher))) {
      usageMap.set(String(booking.subvoucher), booking);
    }
  }

  const items = rows.map((row) => {
    const booking = usageMap.get(String(row.id));

    const isActive = row.status === "1";

    return {
      id: row.id,

      voucherNumber: row.voucher,

      code: row.code,

      status: isActive ? "Active" : "Used",

      used: !isActive,

      usedAt: booking
        ? {
            date: booking.date,
            time: booking.time
          }
        : null
    };
  });

  return {
    voucher: first.voucher,

    date: first.date,
    expiry: first.expiry,

    activity: mapActivity(first),

    paymentMode: first.pmode,
    salesman: first.salesman,

    totalVouchers: items.length,

    usedVouchers: items.filter(
      (item) => item.used
    ).length,

    unusedVouchers: items.filter(
      (item) => !item.used
    ).length,

    items
  };
};