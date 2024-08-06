const depenpencyInjection = require("./dependency-injection");
const dependencyInjectionLoader = require("./postgresql-pool");

module.exports = async ({ app }) => {
    const pool = await postgreSQLPoolLoader();
    console.log("PostgreSQL Pool load..!");
    await dependencyInjectionLoader({ pool });
    console.log("dependency injection load..!");
};
