const { default: Container } = require("typedi");
function addSpacesAround(str) {
    return str.replace(/^/, " ").replace(/$/, " ");
}
async function createQueryAndValuesForFilter({ sequence_number, startTime, endTime, message, level, limit }) {
    let query = "select * from logs where 1=1";
    const values = [];
    if (sequence_number !== "") {
        values.push(sequence_number);
        query += addSpacesAround(`AND $${values.length} > sequence_number`);
    }

    if (startTime !== "") {
        values.push(startTime);
        query += addSpacesAround(`AND timestamp >= $${values.length}::TIMESTAMPTZ`);
    }

    if (endTime !== "") {
        values.push(endTime);
        query += addSpacesAround(`AND timestamp <= $${values.length}::TIMESTAMPTZ`);
    }

    if (message !== "") {
        values.push(`%${message}%`);
        query += addSpacesAround(`AND message ilike $${values.length}::TEXT`);
    }
    if (level !== "") {
        values.push(`%${level}%`);
        query += addSpacesAround(`AND level ilike $${values.length}::TEXT`);
    }

    values.push(limit);
    query += addSpacesAround(`
        order by sequence_number desc
        limit $${values.length}`);

    return [query, values];
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
module.exports = async (req, res) => {
    let { sequence_number, startTime, endTime, message, level, limit = 10 } = req.query;

    const [query, values] = await createQueryAndValuesForFilter({ sequence_number, startTime, endTime, message, level, limit });
    console.log(query, values);
    try {
        const pool = Container.get("pool");

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching historical logs:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
