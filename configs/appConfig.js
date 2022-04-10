const appConfig = {
  env: {
    port: process.env.PORT || 3000,
  },
  db: {
    uri: process.env.DB_URI || 'mongodb+srv://ancv-team:ancv123456789@ancv.txmhq.mongodb.net/AnCv',
  },
  KEY_SECRET_JWT: process.env.KEY_SECRET_JWT || 'ancv123456789',
};

export default appConfig;
