const { Pool } = require("pg");
const { default: Container } = require("typedi");

/**
 * @param {Object} options
 * @param {import("@grpc/grpc-js").Server} grpcServer
 * @param {Pool} options.pool
 *
 * @returns {Promise<void>}
 */
module.exports = async ({ pool, grpcServer }) => {
    Container.set("pool", pool);
    Container.set("grpc-server", grpcServer);
};
