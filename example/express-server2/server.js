const express = require("express");
const { createServer } = require("http");
const logger = require("./winston/logger");

const app = express();

var count = 1;
// 기본 라우트
app.get("/", (req, res, next) => {
    try {
        logger.info("AAAAgood" + (count++).toString());
        // 응답을 보냄
        res.send("hello");
        // 의도적으로 오류를 발생시킴
    } catch (error) {
        next(error); // 오류를 다음 미들웨어로 전달
    }
});
// 오류 처리 미들웨어
app.use((err, req, res, next) => {
    logger.error(err.message); // 오류 메시지를 로그로 기록
    res.status(500).send("Something went wrong!"); // 클라이언트에게 오류 응답을 보냄
});

const server = createServer(app);

server.listen(5001, () => {
    logger.info("Server running on port 5001");
});
