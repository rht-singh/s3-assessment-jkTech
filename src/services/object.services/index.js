const addObjectService = require('./create.object.services');
const getObjectsService = require('./list.objects.services');
const getObjectByIdService = require('./getObjectById.object.services');
const deleteObjectService = require('./delete.object.services');
const updateObjectService = require('./update.object.services');

module.exports = {
  addObjectService,
  getObjectsService,
  getObjectByIdService,
  deleteObjectService,
  updateObjectService,
};
