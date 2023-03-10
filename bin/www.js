#!/usr/bin/env node

/**
 * Module dependencies.
 */

import app from './../app.js';
import debugLib from 'debug';
import http from 'http';
import dotenv from 'dotenv';
import mongoose from 'mongoose'; 

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// config dotenv
dotenv.config({
  path:__dirname+'/./../.env'
});

const debug = debugLib('vms-backend:server');

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

// db connection
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    throw error;
  }
}


/**
 * Listen on provided port, on all network interfaces.
 */

// connect to db and listen
connect().then(() => {
  server.listen(port);
});

server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}


/**
 * Event listener for db connection
 */

// listen on db connection event
mongoose.connection.on('connected', () => {
  console.log('mogodb atlas connected');
});

// listen on db disconnection event 
mongoose.connection.on('disconnected', () => {
  console.log('mogodb atlas disconnected');
});