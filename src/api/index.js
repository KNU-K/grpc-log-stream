const { Router } = require("express");
const historicalLog = require("./historical-logs");
const logs = require("./logs");
const createRouter = () => {
    const router = Router();
    router.use("/historical-logs", historicalLog());
    router.use("/logs", logs());
    return router;
};
module.exports = createRouter;
