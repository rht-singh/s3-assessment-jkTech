/* eslint-disable prefer-destructuring */
const _db = require('../../config');
const { objectValidator: { deleteObjectPayloadValidation } } = require('../../validations');

/**
 *
 * @param {*} _payload
 * @returns {*}
 */

const deleteObjectService = async (_payload) => {
  try {
    const validatedPayload = await deleteObjectPayloadValidation.validateAsync(_payload);
    // after validation hit delete query to delete an entity from db
    const query = `DELETE from object where object_id = ${validatedPayload.objectId} returning *`;
    let objectInfo = await _db.query(query);
    objectInfo = objectInfo.rows[0];
    return objectInfo;
    // create new user with details passed in payload then return a token
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = deleteObjectService;
