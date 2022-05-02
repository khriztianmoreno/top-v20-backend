const mongoose = require('mongoose');
const { createClient } = require('redis');

const URI = process.env.MONGO_DB_URI;
const URI_REDIS = process.env.REDIS_URI;

const redisClient = createClient({
  url: URI_REDIS,
  socket: {
    tls: true,
    rejectUnauthorized: false,
  },
});

async function connectDB() {
  try {
    await mongoose.connect(URI);

    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

async function redisConnect() {
  try {
    redisClient.on('error', (err) => console.log('Redis Client Error', err));

    await redisClient.connect();

    console.log('Redis Connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports = {
  connectDB,
  redisConnect,
  redisClient,
};
