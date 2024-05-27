/* eslint-disable import/no-extraneous-dependencies */
const JWT = require('jsonwebtoken');
const { environmentVariable } = require('../const');

const generateToken = (_payload) => JWT.sign({
  userId: _payload.id,
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
}, environmentVariable.JWT_KEY);

const verifyToken = (token) => JWT.verify(token, environmentVariable.JWT_KEY);

module.exports = {
  generateToken,
  verifyToken,
};
