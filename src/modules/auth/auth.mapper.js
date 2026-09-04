export const customerResponse = (customer) => {

    return {

        id: customer.cid,

        name: customer.name,

        email: customer.email,

        mobile: customer.mobile

    };

};