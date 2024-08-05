const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const fs = require("fs");
const path = require("path");

const PROTO_PATH = path.join(__dirname, "proto/logger.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const { LoggerService } = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();
server.addService(LoggerService.Logger.service, {
    sendLog: async (call, callback) => {
        try {
            console.log(call.request);
            callback(null, { success: true });
        } catch (err) {
            callback(null, { success: false });
        }
    },
});
server.bindAsync("localhost:8080", grpc.ServerCredentials.createInsecure(), (err, port) => {
    if (err) {
        console.error("Server bind failed:", err);
        return;
    }
    console.log(`Server running at http://localhost:8080`);
});
