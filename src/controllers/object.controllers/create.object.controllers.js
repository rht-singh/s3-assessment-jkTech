const { objectServices } = require('../../services');
const { fsConfig } = require('../../config');

/**
 * @param {*} req
 * @param {*} res
 * @returns : success: boolean, bucketInfo: integer
 */
const createObject = async (req, res) => {
  try {
    const _payload = await fsConfig.uploadFile(req);
    req._payload = _payload;
    _payload.userId = req.userId;
    const _result = await objectServices.addObjectService(_payload, req.body);
    return res.json({
      objectId: _result.id,
      success: true,
    });
  } catch (error) {
    await fsConfig.deleteFile(req._payload.exactFilePath);
    return res.status(400).json({ status: 400, message: error.message });
  }
};

module.exports = createObject;
