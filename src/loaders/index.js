const dependencyInjectionLoader = require("./dependency-injection");
const grpcLoader = require("./grpc");
const postgreSQLPoolLoader = require("./postgresql-pool");

module.exports = async ({ app }) => {
    const pool = await postgreSQLPoolLoader();
    console.log("PostgreSQL Pool 로드 완료..!");
    const grpcServer = await grpcLoader();
    console.log("gRPC Setup 로드 완료..!");
    await dependencyInjectionLoader({ pool, grpcServer });
    console.log("Dependency Injection 로드 완료..!");
};
