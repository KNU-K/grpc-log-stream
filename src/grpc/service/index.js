class GRPCService {
    sendLog = async (call, callback) => {
        try {
            console.log(call.request);
            callback(null, { success: true });
        } catch (err) {
            callback(null, { success: false });
        }
    };
}

module.exports = new GRPCService();
