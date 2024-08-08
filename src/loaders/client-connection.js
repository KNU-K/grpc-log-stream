const ClientConnection = require("../utils/client-connection");

module.exports = () => {
    /** 최대 연결 가능 수 */
    return new ClientConnection(5);
};
