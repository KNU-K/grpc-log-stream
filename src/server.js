const express = require("express");
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
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

const grpcServer = new grpc.Server();
grpcServer.addService(LoggerService.Logger.service, {
    sendLog: async (call, callback) => {
        try {
            console.log(call.request);
            callback(null, { success: true });
        } catch (err) {
            callback(null, { success: false });
        }
    },
});

const app = express();
const PORT = 3000;

// Middleware and routes for Express
app.get("/", (req, res) => {
    res.send("Hello from Express!");
});

app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}`);
    grpcServer.bindAsync("localhost:8080", grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error("gRPC Server bind failed:", err);
            return;
        }
        console.log(`gRPC Server running at http://localhost:8080`);
        grpcServer.start();
    });
});
