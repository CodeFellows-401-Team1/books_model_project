'use strict';

require('dotenv').config();
const PORT = process.env.PORT;
const server = require('./src/server.js');
const { db } = require('./src/models/index.js');

db.sync()
  .then(() => {
    server.start(PORT, () => console.log('server is up'));
  })
  .catch((e) => {
    console.error('Could not start server', e.message);
  });
