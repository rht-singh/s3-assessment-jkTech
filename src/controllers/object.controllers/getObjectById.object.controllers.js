const { objectServices } = require('../../services');

/**
 * @param {*} req
 * @param {*} res
 * @returns : success: boolean, bucketInfo: integer
 */
const getObjectById = async (req, res) => {
  try {
    const _payload = req.params;
    const _result = await objectServices.getObjectByIdService(_payload);
    return res.json({
      data: { objectInfo: _result },
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

module.exports = getObjectById;
