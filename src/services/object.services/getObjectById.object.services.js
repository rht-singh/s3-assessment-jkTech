const _db = require('../../config');
const { objectValidator: { getObjectByIdPayloadValidation } } = require('../../validations');

/**
 *
 * @param {*} _payload
 * @returns {*}
 */

const getObjectByIdService = async (_payload) => {
  try {
    const validatedPayload = await getObjectByIdPayloadValidation.validateAsync(_payload);
    // after validation hit an api to fetch all objects for a particular bucket.
    const query = `SELECT * from object where bucket_name = '${validatedPayload.bucketName}' and object_id = ${validatedPayload.objectId}`;
    let objectInfo = await _db.query(query);
    objectInfo = objectInfo.rows;
    return objectInfo;
    // create new user with details passed in payload then return a token
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getObjectByIdService;
