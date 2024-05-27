/* eslint-disable import/no-extraneous-dependencies */
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = upload;
