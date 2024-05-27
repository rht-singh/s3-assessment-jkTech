const { objectServices } = require('../../services');

/**
 * @param {*} req
 * @param {*} res
 * @returns : success: boolean, bucketInfo: integer
 */
const updateObject = async (req, res) => {
  try {
    const fileInfo = req.file;
    const _payload = {
      ...req.params,
      ...req.body,

    };
    const _result = await objectServices.updateObjectService(_payload, fileInfo);
    return res.json({
      objectId: _result.id,
      success: true,
    });
  } catch (error) {
    return res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports = updateObject;
