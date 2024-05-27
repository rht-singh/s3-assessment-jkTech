const _db = require('../../config');
const { objectValidator: { getObjectsPayloadValidation } } = require('../../validations');

/**
 *
 * @param {*} _payload
 * @returns {*}
 */

const getObjectsService = async (_payload, userId) => {
  try {
    const validatedPayload = await getObjectsPayloadValidation.validateAsync(_payload);
    // after validation hit an api to fetch all objects for a particular bucket.
    validatedPayload.pageNumber -= 1;
    const query = `SELECT b.bucket_name,
                    (
                    SELECT  array_to_json(array_agg(o))
                    from object o where o.bucket_name = b.bucket_name
                    ) as objects
                from bucket b
                where b.user_id = ${userId}
                ORDER BY ${validatedPayload.sortBy} ${validatedPayload.sortOrder}  LIMIT ${validatedPayload.pageSize} OFFSET ${validatedPayload.pageNumber}`;
    let listOfObjects = await _db.query(query);
    listOfObjects = listOfObjects.rows;
    return listOfObjects;
    // create new user with details passed in payload then return a token
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = getObjectsService;
