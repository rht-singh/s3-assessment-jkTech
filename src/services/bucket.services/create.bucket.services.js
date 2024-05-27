/* eslint-disable no-throw-literal */
const { bucketValidator: { bucketPayloadValidation } } = require('../../validations');
const _db = require('../../config');

/**
 *
 * @param {*} _payload
 * @returns {*}
 */

const addBucketService = async (_payload, userId) => {
  try {
    const validatedPayload = await bucketPayloadValidation.validateAsync(_payload);
    // after validation check a bucket already exist or not.
    // if bucket exist throw an error else create a new bucket
    const isBucketExist = await _db.query(`SELECT * From bucket WHERE bucket_name = '${validatedPayload.bucketName}'`);
    if (isBucketExist.rows.length) {
      throw ({ message: 'Bucket already exist with same name' });
    }
    const query = `INSERT INTO bucket (user_id, bucket_name, acl, description)  
    VALUES (${userId}, '${validatedPayload.bucketName}', '${validatedPayload.acl}', '${validatedPayload.description}') Returning *`;
    console.log(query);
    const addBucket = await _db.query(query);
    return {
      id: addBucket.rows[0].bucket_name,
      suceess: true,
    };
    // create new user with details passed in payload then return a token
  } catch (error) {
    throw ({ status: 400, message: error.message });
  }
};

module.exports = addBucketService;
