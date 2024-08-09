const { default: Container } = require("typedi");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
module.exports = async (req, res) => {
    const { sequence_number, timestamp, limit = 5 } = req.query;
    console.log(sequence_number);
    const query = `
        SELECT * FROM logs
        WHERE sequence_number <  $1
        order by sequence_number desc
        LIMIT $2
    `;
    console.log(query);
    const values = [parseInt(sequence_number), parseInt(limit)];
    console.log(values);
    try {
        const pool = Container.get("pool");

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching historical logs:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
