const objectRoutes = require('express').Router();
const { objectControllers } = require('../controllers');
const { multerConfig } = require('../config');
const { auth } = require('../middleware');

objectRoutes.post('/add', multerConfig.single('file'), auth, objectControllers.createObject);
objectRoutes.get('/list', auth, objectControllers.getObjects);
objectRoutes.get('/:objectId/:bucketName', auth, objectControllers.getObjectById);
objectRoutes.delete('/:objectId', auth, objectControllers.deleteObject);
objectRoutes.patch('/:objectId', multerConfig.single('file'), auth, objectControllers.updateObject);

module.exports = objectRoutes;
