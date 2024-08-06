const { Pool } = require("pg");

module.exports = async () => {
    const pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: "SERVER_LOG",
        password: "mysecretpassword",
        port: 5432,
    });

    try {
        // 연결을 비동기적으로 확인
        await pool.connect();
        console.log("Pool 연결 테스트 성공");
    } catch (err) {
        console.error("Pool 연결 테스트 실패", err);
        throw err;
    }

    // 연결 성공 후 풀을 반환
    return pool;
};
