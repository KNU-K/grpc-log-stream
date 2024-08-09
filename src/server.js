const http = require("http");
const createApp = require("./app");
const { default: Container } = require("typedi");
const grpc = require("@grpc/grpc-js");

const PORT = 3000;

(async function serverBootStrap() {
    const app = await createApp();

    const server = http.createServer(app);
    const grpcServer = Container.get("grpc-server");
    server.listen(PORT, () => {
        console.log(`Express server running at http://localhost:${PORT}`);

        grpcServer.bindAsync("localhost:8080", grpc.ServerCredentials.createInsecure(), (err, port) => {
            if (err) {
                console.error("gRPC Server bind failed:", err);
                return;
            }
            console.log(`gRPC Server running at http://localhost:8080`);
            /**
             * deprecated
             * grpcServer.start();
             **/
        });
    });
})();
