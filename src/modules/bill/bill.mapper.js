export const mapBill = (bill) => {
    return {
        id: bill.blid,

        bookingNumber: bill.bkngno,
        billNumber: bill.fblno,

        date: bill.date,
        time: bill.time,

        bookingDate: bill.bdate,
        eventDate: bill.fdate,
        eventTime: bill.ftime,
        partyDate: bill.dob,

        event: {
            type: bill.event_type,
            slot: bill.tslot,
            theme: bill.theme,
            name: bill.kname
        },

        customer: {
            name: bill.name,
            mobile: bill.mobile,
            email: bill.email
        },

        participants: {
            adults: bill.noofprts,
            kids: bill.noofkids
        },

        amounts: {
            gross: bill.gross,
            gst: bill.gst,
            net: bill.net,
            finalAmount: bill.finalamt,
            advance: bill.advance,
            pending: bill.pending,
            discount: bill.discount
        },

        payment: {
            mode: bill.payment_mode,
            advanceMode: bill.amode,
            finalMode: bill.fmode,

            cash: bill.amt_cash,
            upi: bill.amt_upi_online,
            card: bill.amt_card,
            bankTransfer: bill.amt_bank_transfer
        },

        status: bill.status,
        accepted: bill.accepted
    };
};


export const mapBillDetails = (bill) => {
    return {
        ...mapBill(bill),

        id: bill.blid,

        reference: {
            queryReference: bill.qref
        },

        package: {
            extraPackage: bill.extrappk,
            features: bill.features
        },

        pricing: {
            pricePerAdult: bill.prtsperamt,
            adultAmount: bill.prtsamt,

            pricePerKid: bill.kidsperamt,
            kidAmount: bill.kidsamt,

            foodAmount: bill.foodamt,
            foodAmountFinal: bill.foodamtfl,

            foodExpense: bill.foodexpn,
            foodDescription: bill.fooddesc,

            baseAmount: bill.bsamount,
            minimumPax: bill.minpax,
            finalPax: bill.finalpax
        },

        food: {
            drinks: bill.drinks,
            starter: bill.starter,
            mainCourse: bill.mcourse,
            dessert: bill.dessert,
            liveCounter: bill.lcounter
        },

        discount: {
            amount: bill.discount,
            reason: bill.discount_reason
        },

        transaction: {
            cardLastFour: bill.card_digits,
            transactionLastFour: bill.txn_digits
        },

        notes: {
            clientNote: bill.clientnote,
            reason: bill.reason
        },

        staff: {
            salesperson: bill.salesperson,
            createdBy: bill.aby,
            staff: bill.staff
        }
    };
};