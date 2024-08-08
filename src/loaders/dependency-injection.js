const { Pool } = require("pg");
const { default: Container } = require("typedi");

/**
 * @param {Object} options
 * @param {import("@grpc/grpc-js").Server} grpcServer
 * @param {Pool} options.pool
 * @param {import("amqplib").Channel} channel
 *
 * @returns {Promise<void>}
 */
module.exports = async ({ pool, grpcServer, channel, clientConnection }) => {
    Container.set("pool", pool);
    Container.set("grpc-server", grpcServer);
    Container.set("mq-channel", channel);
    Container.set("clients", clientConnection);
};
