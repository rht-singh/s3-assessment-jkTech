const { bucketServices } = require('../../services');

/**
 * @param {*} req
 * @param {*} res
 * @returns : success: boolean, bucketInfo: integer
 */
const getBuckets = async (req, res) => {
  try {
    const _payload = req.query;
    const _result = await bucketServices.getBucketsService(_payload, req.userId);
    return res.json({
      data: { listOfBucket: _result },
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

module.exports = getBuckets;
