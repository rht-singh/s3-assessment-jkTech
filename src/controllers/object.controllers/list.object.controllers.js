const { objectServices } = require('../../services');

/**
 * @param {*} req
 * @param {*} res
 * @returns : success: boolean, bucketInfo: integer
 */
const getObjects = async (req, res) => {
  try {
    const _payload = req.query;
    const _result = await objectServices.getObjectsService(_payload, req.userId);
    return res.json({
      data: { listOfObjects: _result },
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

module.exports = getObjects;
