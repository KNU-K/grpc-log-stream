const amqp = require("amqplib");
const { createChannel } = require("../amqp");
const startConsumer = require("../amqp/consumer");
const RABBITMQ_HOST = "localhost";
const RABBITMQ_USER = "user";
const RABBITMQ_PASS = "password";

module.exports = async () => {
    const connection = await amqp.connect(`amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}`);
    const channel = await createChannel({ connection });
    await channel.assertQueue("log_queue", { durable: true });
    await startConsumer({ channel });

    return channel;
};
