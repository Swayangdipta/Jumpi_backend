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
    latestEvent,
    stores
}) => {

    return {

        customer: {
            id: customer.cid,
            name: customer.name,
            mobile: customer.mobile,
            email: customer.email
        },


        summary: {
            totalActivity: activeBookings,
            birthdayParties: partyFiles,
            openQueries
        },

        stores: stores.map(s => s.name)

    };
};