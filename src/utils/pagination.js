export const getPagination = (query) => {
    let page = Number.parseInt(query.page, 10);
    let limit = Number.parseInt(query.limit, 10);

    if (!Number.isInteger(page) || page < 1) {
        page = 1;
    }

    if (!Number.isInteger(limit) || limit < 1) {
        limit = 20;
    }

    // Never allow the client to request huge datasets.
    if (limit > 50) {
        limit = 50;
    }

    const offset = (page - 1) * limit;

    return {
        page,
        limit,
        offset
    };
};