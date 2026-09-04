export const customerProfileResponse = (customer) => {
    return {
        id: customer.cid,
        name: customer.name,
        mobile: customer.mobile,
        email: customer.email,

        membership: {
            package: customer.pack,
            cardNumber: customer.cardno,
            expiry: customer.expiry
        }
    };
};


export const dashboardResponse = ({
    customer,
    activeBookings,
    nextVisit,
    partyFiles,
    openQueries,
    pendingAmount,
    latestBill,
    latestEvent
}) => {

    return {

        customer: {
            id: customer.cid,
            name: customer.name,
            mobile: customer.mobile,
            email: customer.email,

            pass: {
                package: customer.pack,
                cardNumber: customer.cardno,
                expiry: customer.expiry
            }
        },


        summary: {
            activeBookings,
            partyFiles,
            openQueries,
            pendingAmount
        },


        nextVisit: nextVisit
            ? {
                bookingId: nextVisit.bookid,
                bookingRecordId: nextVisit.bid,
                date: nextVisit.date,
                time: nextVisit.time,
                endTime: nextVisit.endtime,
                formattedTime: nextVisit.strtime,
                duration: nextVisit.duration,
                package: nextVisit.pack
            }
            : null,


        partyPayment: {

            latestEvent: latestEvent
                ? {
                    id: latestEvent.blid,
                    type: latestEvent.event_type,
                    bookingDate: latestEvent.bdate,
                    functionDate: latestEvent.fdate,
                    time: latestEvent.ftime,
                    slot: latestEvent.tslot,
                    theme: latestEvent.theme,
                    status: latestEvent.status
                }
                : null,


            lastBill: latestBill
                ? {
                    id: latestBill.blid,
                    bookingNumber: latestBill.bkngno,
                    billNumber: latestBill.fblno,
                    date: latestBill.date,
                    eventType: latestBill.event_type,
                    net: latestBill.net,
                    finalAmount: latestBill.finalamt,
                    advance: latestBill.advance,
                    pending: latestBill.pending,
                    paymentMode: latestBill.payment_mode,
                    status: latestBill.status
                }
                : null,


            pending: {
                amount: pendingAmount,
                status: pendingAmount > 0
                    ? "Pending"
                    : "Paid"
            }
        }
    };
};