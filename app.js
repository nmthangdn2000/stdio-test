import 'dotenv/config.js';
import * as server from './start/server';
import * as database from './start/database';

(async () => {
  try {
    server.start();
    await database.connect();
  } catch (error) {
    console.log(`Cannot start server. Error: ${e}`);
  }
})();
