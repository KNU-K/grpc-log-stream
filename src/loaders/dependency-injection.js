const { default: Container } = require("typedi");

module.exports = ({ pool }) => {
    Container.set("pool", pool);
};
