async function startConsumer({ channel }) {
    try {
        channel.consume(
            "log_queue",
            (msg) => {
                if (msg !== null) {
                    const logMessage = msg.content.toString();
                    console.log("Received:", logMessage);

                    // 메시지 처리 로직 (예: DB에 저장 등)

                    // 메시지 처리 완료 후 확인
                    channel.ack(msg);
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
