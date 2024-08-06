const createChannel = async ({ connection }) => {
    return await connection.createChannel();
};
module.exports = { createChannel };
