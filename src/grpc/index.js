const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const grpc = require("@grpc/grpc-js");
const gRPCService = require("./service");

const PROTO_PATH = path.join(__dirname, "proto/logger.proto");

async function gRPCSetup({ server }) {
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    });
    const { LoggerService } = grpc.loadPackageDefinition(packageDefinition);

    server.addService(LoggerService.Logger.service, {
        sendLog: gRPCService.sendLog,
    });

    return server;
}
module.exports = gRPCSetup;
