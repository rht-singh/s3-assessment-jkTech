const bucketRoutes = require('express').Router();
const { bucketControllers } = require('../controllers');
const { auth } = require('../middleware');

bucketRoutes.post('/add', auth, bucketControllers.createBucket);
bucketRoutes.get('/list', auth, bucketControllers.getBuckets);

module.exports = bucketRoutes;
