const moment = require("moment");
const { default: Container } = require("typedi");

async function parseTimestamp(timestamp) {
    // "2024-08-06 18:51:32:5132" 형식을 "2024-08-06 18:51:32.513"으로 변환
    const match = timestamp.match(/^(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}):(\d{1,4})$/);
    if (match) {
        const datetimePart = match[1];
        const milliseconds = match[2].slice(0, 3); // 밀리초는 최대 세 자리까지만 허용
        return `${datetimePart}.${milliseconds}`;
    }
    return null;
}
var count = 1;
/** Broadcast */
async function sendLogToClients(logMessage) {
    const clients = Container.get("clients");
    clients.forEach((client) => {
        client.write(`data: ${JSON.stringify(logMessage)}\n\n`);
    });
}

async function startConsumer({ channel }) {
    try {
        channel.consume(
            "log_queue",
            async (msg) => {
                if (msg !== null) {
                    console.log(count++);
                    const logMessage = msg.content.toString();
                    // console.log("Received:", logMessage);

                    // 로그 메시지를 데이터베이스에 삽입
                    try {
                        const pool = Container.get("pool");
                        const logObject = JSON.parse(logMessage);
                        let { node, timestamp, level, message } = logObject;
                        timestamp = await parseTimestamp(timestamp);
                        if (timestamp) {
                            timestamp = moment(timestamp, ["YYYY-MM-DD HH:mm:ss.SSS", moment.ISO_8601]).toISOString();
                            const query = `
                                INSERT INTO logs (node, timestamp, level, message)
                                VALUES ($1, $2, $3, $4)
                            `;
                            const values = [node, timestamp, level, message];

                            await pool.query(query, values);
                            const result = await pool.query("select * from logs order by sequence_number desc limit 1");
                            await sendLogToClients(result.rows[0]);
                        } else {
                            console.error("Invalid timestamp format:", timestamp);
                        }
                    } catch (dbError) {
                        console.error("Error inserting log into database:", dbError);
                    } finally {
                        // 메시지 확인
                        channel.ack(msg);
                    }
                }
            },
            {
                noAck: false, // 메시지 확인을 직접 처리
            }
        );
    } catch (error) {
        console.error("Error starting consumer:", error);
    }
}

module.exports = startConsumer;
