export const mapBooking = (booking) => ({
  id: booking.bid,

  date: booking.date,
  time: booking.time,
  endTime: booking.endtime,

  bookingNumber: booking.bookid,

  customer: {
    id: booking.cusref,
    name: booking.cusname,
    mobile: booking.cusmob
  },

  activity: booking.activity_id
    ? {
        id: booking.activity_id,
        name: booking.activity_name,
        type: booking.activity_type,
        category: booking.activity_category,

        time: booking.activity_time,
        timeUnit: booking.activity_time_unit,
        duration: booking.activity_duration,

        charge: booking.activity_charge,
        gst: booking.activity_gst,
        status: booking.activity_status
      }
    : null,

  voucher: booking.voucher,
  subVoucher: booking.subvoucher,
  carnival: booking.carnival,

  duration: booking.duration,

  pricing: {
    bookingAmount: booking.bkamount,
    amount: booking.amount,
    gst: booking.gst,
    total: booking.total,

    quantity: booking.qty,

    additionalAmount: booking.aamount,
    additionalGst: booking.agst,
    net: booking.net
  },

  paymentMode: booking.pmode,

  checkout: booking.checkout,
  status: booking.status,
  memberStatus: booking.mstatus,

  cancellation: {
    flag: booking.cancellation_flag,
    date: booking.cancdate,
    time: booking.canctime,
    reason: booking.reason
  },

  redemption: {
    flag: booking.redeem_flag
  },

  qrSerial: booking.qrserial
});


export const mapBookingDetails = (booking) => ({
  ...mapBooking(booking),

  staff: booking.staff,
  serial: booking.serial,
  rfid: booking.rfid,

  timings: {
    start: booking.strtime,
    checkIn: booking.strchkintime,
    checkOut: booking.strchkouttime,
    extension: booking.strextime
  },

  rawTimings: {
    time: booking.time,
    endTime: booking.endtime,
    checkoutTime: booking.chkouttime,
    extensionTime: booking.extime
  },

  accessories: {
    items: booking.accessories,
    price: booking.accessoriespr,
    additionalPrice: booking.accessories_pr,
    additionalPricePr: booking.accessoriespr_pr
  },

  feedback: {
    feedback: booking.feedback,
    rating: booking.rating
  },

  cctv: {
    checked: booking.cctv_checked,
    remarks: booking.cctv_remarks
  },

  reception: {
    name: booking.rname,
    cctv: booking.rcctv,
    pin: booking.rpin,
    status: booking.rstatus
  },

  participants: booking.pcount,

  printStatus: booking.printst,
  sprint: booking.sprint,
  sockssl: booking.sockssl,

  promocode: booking.promocode
});