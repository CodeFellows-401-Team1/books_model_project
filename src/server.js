'use strict';

const express = require('express');
const cors = require('cors');

const errorHandler = require('./error-handlers/500.js');
const notFoundHandler = require('./error-handlers/404.js');
const authRoutes = require('./auth/routes.js');
const v1Routes = require('./routes/v1.js');
const v2Routes = require('./routes/v2.js');
const logger = require('./middleware/logger.js');

const server = express();

server.use(cors());

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(logger);

server.use(authRoutes);
server.use('/api/v1', v1Routes);
server.use('/api/v2', v2Routes);

server.use('*', notFoundHandler);
server.use(errorHandler);

module.exports = {
  server,
  start: (port) => {
    if (!port) {
      throw new Error('Missing Port');
    }
    server.listen(port, () => console.log(`Listening on ${port}`));
  },
};
