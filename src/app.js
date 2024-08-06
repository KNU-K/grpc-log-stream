const loaders = require("./loaders");
const express = require("express");
const createApp = async () => {
    const app = express();
    await loaders({ app });
    return app;
};
module.exports = createApp;
