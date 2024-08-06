const grpc = require("@grpc/grpc-js");
const gRPCSetup = require("../grpc");
module.exports = async () => {
    const server = new grpc.Server();
    await gRPCSetup({ server });

    return server;
};
