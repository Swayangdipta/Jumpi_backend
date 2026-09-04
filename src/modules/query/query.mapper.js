export const mapQuery = (query) => {
    return {
        id: query.id,

        queryNumber: query.queryno,

        date: query.date,
        time: query.time,
        bookingDate: query.bdate,

        customer: {
            name: query.name,
            mobile: query.mobile,
            email: query.email,
            address: query.address
        },

        event: {
            name: query.kname,
            type: query.event_type,
            dateOfBirth: query.dob
        },

        participants: {
            adults: query.noofprts,
            kids: query.noofkids
        },

        notes: query.notes,

        leadSource: query.lead_source,

        status: query.status
    };
};


export const mapQueryDetails = (query) => {
    return {
        ...mapQuery(query),

        assignment: {
            assignedBy: query.assignedby,
            assignedTo: query.assignedto
        },

        createdBy: query.aby,

        staff: query.staff
    };
};