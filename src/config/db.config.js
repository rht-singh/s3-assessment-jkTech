// eslint-disable-next-line import/no-extraneous-dependencies
const { Client } = require('pg');
const { environmentVariable } = require('../const');

const client = new Client({
  user: environmentVariable.SQLUSER,
  database: environmentVariable.SQLDB,
  password: environmentVariable.SQLPASS,
  port: environmentVariable.SQLPORT,
  host: environmentVariable.SQLHOST,
  ssl: {
    rejectUnauthorized: false,
    // You can add more SSL configurations like cert, key, and ca if required
  },
});
client.connect();

async function queryExecuter(statement) {
  const response = await client.query(statement);
  return response;
}

module.exports = queryExecuter;
