const _db = require('../../config');
const { bucketValidator: { getBucketsPayloadValidation } } = require('../../validations');

/**
 *
 * @param {*} _payload
 * @returns {*}
 */

const getBucketsService = async (_payload, userId) => {
  try {
    const validatedPayload = await getBucketsPayloadValidation.validateAsync(_payload);
    // after validation hit an api to fetch all buckets for a particular user.
    validatedPayload.pageNumber -= 1;
    const query = `SELECT * FROM bucket where user_id = ${userId} ORDER BY ${validatedPayload.sortBy} ${validatedPayload.sortOrder}  LIMIT ${validatedPayload.pageSize} OFFSET ${validatedPayload.pageNumber}`;
    let listOfBucket = await _db.query(query);
    listOfBucket = listOfBucket.rows;
    return listOfBucket;
    // create new user with details passed in payload then return a token
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getBucketsService;
