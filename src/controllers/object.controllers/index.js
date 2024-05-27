const createObject = require('./create.object.controllers');
const getObjects = require('./list.object.controllers');
const getObjectById = require('./getObjectById.object.controllers');
const deleteObject = require('./deleteObject.controllers');
const updateObject = require('./update.object.controllers');

module.exports = {
  createObject,
  getObjects,
  getObjectById,
  deleteObject,
  updateObject,
};
