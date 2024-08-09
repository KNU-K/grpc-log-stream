const { Router } = require("express");
const controller = require("./controller");

module.exports = () => {
    const route = Router();

    route.get("/", controller);
    return route;
};
