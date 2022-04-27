const dotenv = require('dotenv');
const express = require('express');
const http = require('http');

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env';
dotenv.config({ path: envFile });

const configExpress = require('./config/express');
const connectDB = require('./config/database');
const routes = require('./routes');
const { connectSocket } = require('./config/socket');

const app = express();
const server = http.Server(app);

const env = process.env.NODE_ENV;

if (env !== 'test') {
  connectDB();
}

configExpress(app);
connectSocket(server);
routes(app);

module.exports = { app, server };
