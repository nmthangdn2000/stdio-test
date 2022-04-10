import 'dotenv/config.js';
import * as server from './start/server';

(async () => {
  try {
    server.start();
  } catch (error) {
    console.log(`Cannot start server. Error: ${e}`);
  }
})();
