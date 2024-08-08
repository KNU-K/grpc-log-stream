const ClientConnection = require("./client-connection");
const dependencyInjectionLoader = require("./dependency-injection");
const expressLoader = require("./express");
const grpcLoader = require("./grpc");
const postgreSQLPoolLoader = require("./postgresql-pool");
const rabbitMQLoader = require("./rabbitmq");

module.exports = async ({ app }) => {
    const clientConnection = await ClientConnection();
    console.log("Client Connection Container 로드 완료..!");
    const pool = await postgreSQLPoolLoader();
    console.log("PostgreSQL Pool 로드 완료..!");
    const channel = await rabbitMQLoader();
    console.log("PostgreSQL Pool 로드 완료..!");
    const grpcServer = await grpcLoader();
    console.log("gRPC Setup 로드 완료..!");

    await dependencyInjectionLoader({ pool, channel, grpcServer, clientConnection });
    console.log("Dependency Injection 로드 완료..!");
    await expressLoader({ app });
    console.log("express 로드 완료..!");
};
