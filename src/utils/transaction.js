import db from "../database/db.js";

const withTransaction = async (callback) => {

    const connection = await db.getConnection();

    try {

        await connection.beginTransaction();

        const result = await callback(connection);

        await connection.commit();

        return result;

    } catch (error) {

        await connection.rollback();

        throw error;

    } finally {

        connection.release();

    }

};

export default withTransaction;