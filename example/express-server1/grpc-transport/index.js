const TransportStream = require("winston-transport");
const grpcClient = require("./grpc-client");

class GrpcTransport extends TransportStream {
    constructor(opts) {
        super(opts);
    }

    log(info, callback) {
        setImmediate(() => {
            this.emit("logged", info);
        });

        const { timestamp, level, message } = info;

        // ANSI 색상 코드를 제거합니다.
        const cleanLevel = level.replace(/\x1B\[[0-9;]*m/g, "");
        const cleanMessage = message.replace(/\x1B\[[0-9;]*m/g, "");

        grpcClient.SendLog({ node: "node1", timestamp, level: cleanLevel, message: cleanMessage }, (err, response) => {
            if (err) {
                console.error("Failed to send log to gRPC server:", err);
            } else {
                console.log("Log sent to gRPC server:", response);
            }
        });

        callback();
    }
}

module.exports = GrpcTransport;
