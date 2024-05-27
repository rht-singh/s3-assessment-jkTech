/* eslint-disable no-throw-literal */
const { objectValidator: { objectPayloadValidation } } = require('../../validations');
const _db = require('../../config');

/**
 *
 * @param {*} _payload
 * @returns {*}
 */

const addObjectService = async (_payload, _bodyPayload) => {
  try {
    const validatedPayload = await objectPayloadValidation.validateAsync(_bodyPayload);
    // after validation check a bucket already exist or not.
    // if bucket not exist throw an error
    const isBucketExist = await _db.query(`SELECT * From bucket WHERE bucket_name = '${validatedPayload.bucketName}'`);
    if (!isBucketExist.rows.length) {
      throw ({ message: 'Bucket not exist' });
    }
    const query = `INSERT INTO object (bucket_name, description, file_type, file_size, file_url,object_name)  
    VALUES ('${validatedPayload.bucketName}', '${validatedPayload.description}', '${_payload.fileType}', ${_payload.size}, '${_payload.fileUrl}', '${_payload.fileName}') Returning *`;
    const addObject = await _db.query(query);
    return {
      id: addObject.rows[0].object_id,
      suceess: true,
    };
    // create new user with details passed in payload then return a token
  } catch (error) {
    throw ({ status: 400, message: error.message });
  }
};

module.exports = addObjectService;
