const dependencyInjectionLoader = require("./dependency-injection");
const grpcLoader = require("./grpc");
const postgreSQLPoolLoader = require("./postgresql-pool");

module.exports = async ({ app }) => {
    // const pool = await postgreSQLPoolLoader();
    // console.log("PostgreSQL Pool load..!");
    const grpcServer = await grpcLoader();
    console.log("gRPC Setup load..!");
    await dependencyInjectionLoader({ grpcServer });
    console.log("Dependency Injection load..!");
};
