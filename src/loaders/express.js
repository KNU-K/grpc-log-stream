const cors = require("cors");
const { static } = require("express");
const path = require("path");
const createRouter = require("../api/inedx");

module.exports = async ({ app }) => {
    app.use(cors());
    app.use(static(path.join(__dirname, "../dashboard")));
    app.get("/dashboard", (req, res) => res.sendFile(path.join(__dirname, "../dashboard", "index.html")));

    app.use(createRouter());
};
