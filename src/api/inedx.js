const { Router } = require("express");
const historicalLog = require("./historical-logs");
const logs = require("./logs");
const createRouter = () => {
    const router = Router();
    historicalLog({ router });
    logs({ router });
    return router;
};
module.exports = createRouter;
