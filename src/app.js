const loaders = require("./loaders");
const express = require("express");
const createApp = async () => {
    const app = express();
    await loaders({ app });
};
module.exports = createApp;
