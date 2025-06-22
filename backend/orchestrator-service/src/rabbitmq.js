const amqp = require('amqplib');

let channel;
let connected = false;

const RABBITMQ_URL = process.env.RABBITMQ_URL;
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const initRabbit = async () => {
  let retries = 5;
  while (retries) {
    try {
      const connection = await amqp.connect(RABBITMQ_URL);
      channel = await connection.createChannel();
      await channel.assertQueue('user_created', { durable: true });
      connected = true;
      console.log('✅ Connected to RabbitMQ');
      break;
    } catch (err) {
      retries--;
      console.error('❌ RabbitMQ not ready. Retrying in 5s... (${retries} attempts left)');
      await sleep(5000);
    }
  }

  if (!connected) {
    console.error('❌ Failed to connect to RabbitMQ after retries.');
  }
};

const publishUserCreated = async (user) => {
  if (!channel) {
    console.warn('⚠️ RabbitMQ channel not available');
    return;
  }

  const message = {
    userId: user.id || user.user?.id,
    role: user.role || user.user?.role,
    email: user.email || user.user?.email
  };

  console.log('📨 Publishing message to RabbitMQ:', message);

  if (!message.userId || !message.email || !message.role) {
    console.warn('⚠️ Incomplete user data for RabbitMQ message:', user);
    return;
  }

  channel.sendToQueue('user_created', Buffer.from(JSON.stringify(message)), {
    persistent: true
  });

  console.log('✅ Message sent to queue');
};


module.exports = {
  initRabbit,
  publishUserCreated
};