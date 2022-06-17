import 'dotenv/config.js';
import * as server from './start/server';
import * as database from './start/database';
import * as drive from './helpers/driver.helper';
import * as mailer from './helpers/mailer';

(async () => {
  try {
    server.start();
    await database.connect();
    // await drive.connect();
    // drive.listFiles();
  } catch (e) {
    console.log(`Cannot start server. Error: ${e}`);
  }
})();
