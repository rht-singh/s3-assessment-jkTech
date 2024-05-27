require('dotenv').config();

const environmentVariable = {
  PORT: process.env.PORT,
  JWT_KEY: process.env.JWT_KEY,
  SQLUSER: process.env.SQLUSER,
  SQLDB: process.env.SQLDB,
  SQLPASS: process.env.SQLPASS,
  SQLPORT: process.env.SQLPORT,
  SQLHOST: process.env.SQLHOST,
};

module.exports = environmentVariable;
