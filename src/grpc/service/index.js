const { default: Container } = require("typedi");

class GRPCService {
    sendLog = async (call, callback) => {
        const channel = Container.get("mq-channel");
        try {
            const logMessage = JSON.stringify({
                node: call.request.node,
                timestamp: call.request.timestamp,
                level: call.request.level,
                message: call.request.message,
            });
            console.log(logMessage);
            channel.sendToQueue("log_queue", Buffer.from(logMessage), { persistent: true });

            callback(null, { success: true });
        } catch (err) {
            callback(null, { success: false });
        }
    };
}

module.exports = new GRPCService();
