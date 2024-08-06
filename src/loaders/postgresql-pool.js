const { Pool } = require("pg");

module.exports = async () => {
    const pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: "mydatabase",
        password: "mysecretpassword",
        port: 5432,
    });
    pool.connect((err) => {
        if (err) throw err;
        console.log("good");
    });
    return pool;
};
