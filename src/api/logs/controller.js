const { default: Container } = require("typedi");

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
async function getLogs() {
    // Fetch the latest 10 logs to send to the client
    const query = `
        SELECT * FROM logs
        order by sequence_number desc
        LIMIT 10
    `;

    try {
        const pool = Container.get("pool");
        const result = await pool.query(query);
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error fetching initial logs:", error);
    }
}
module.exports = async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    (await getLogs()).rows.reverse().forEach((log) => {
        res.write(`data: ${JSON.stringify(log)}\n\n`);
    });

    const clients = Container.get("clients");
    clients.addConnection(res);
    console.log("클라 연결 성공", clients.length);
    req.on("close", () => {
        if (!clients.removeConnection(res)) {
            throw new Error("클라 삭제 실패");
        }
        console.log("클라 삭제 성공", clients.length);
    });
};
