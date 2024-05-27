const { bucketServices } = require('../../services');

/**
 * @param {*} req
 * @param {*} res
 * @returns : success: boolean, bucketInfo: integer
 */
const createBucket = async (req, res) => {
  try {
    const _payload = req.body;
    const _result = await bucketServices.addBucketService(_payload, req.userId);
    return res.json({
      bucketId: _result.id,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports = createBucket;
