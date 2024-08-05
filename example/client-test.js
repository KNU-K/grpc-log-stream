const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const path = require("path");
const MockObj = require("./mock-obj/log");

const PROTO_PATH = path.join(__dirname, "proto/logger.proto");
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const { LoggerService } = grpc.loadPackageDefinition(packageDefinition);

const client = new LoggerService.Logger("localhost:8080", grpc.credentials.createInsecure());

client.SendLog(MockObj, (err, response) => {
    if (err) {
        console.error("Login failed:", err.details);
        return;
    }
    console.log(response);
});
