const { default: Container } = require("typedi");
const cors = require("cors");
const { static } = require("express");
const path = require("path");

module.exports = async ({ app }) => {
    app.use(cors());
    app.use(static(path.join(__dirname, "../build")));

    // 모든 요청을 index.html로 리다이렉트
    app.get("/dashboard", (req, res) => {
        res.sendFile(path.join(__dirname, "../build", "index.html"));
    });

    app.get("/historical-logs", async (req, res) => {
        console.log("hello");
        const { sequence_number, timestamp, limit = 10 } = req.query;
        console.log(sequence_number);
        const query = `
            SELECT * FROM logs
            WHERE sequence_number <  $1
            LIMIT $2
        `;
        const values = [parseInt(sequence_number), parseInt(limit)];
        console.log(values);
        try {
            const pool = Container.get("pool");
            const result = await pool.query(query, values);
            res.json(result.rows.reverse());
        } catch (error) {
            console.error("Error fetching historical logs:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    app.get("/logs", async (req, res) => {
        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");

        // Fetch the latest 10 logs to send to the client
        const query = `
            SELECT * FROM logs
            LIMIT 10
        `;
        try {
            const pool = Container.get("pool");
            const result = await pool.query(query);
            console.log(result);
            result.rows.reverse().forEach((log) => {
                res.write(`data: ${JSON.stringify(log)}\n\n`);
            });
        } catch (error) {
            console.error("Error fetching initial logs:", error);
        }

        // Add the client to the list of clients
        let clients = Container.get("clients");
        clients.push(res);

        req.on("close", () => {
            clients = clients.filter((client) => client !== res);
        });
    });
};
