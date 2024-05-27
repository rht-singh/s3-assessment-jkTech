const { objectServices } = require('../../services');
const { fsConfig } = require('../../config');

/**
 * @param {*} req
 * @param {*} res
 * @returns : success: boolean, bucketInfo: integer
 */
const deleteObject = async (req, res) => {
  try {
    const _payload = req.params;
    const _result = await objectServices.deleteObjectService(_payload);
    // delete a file from system also
    fsConfig.deleteFile(`${process.cwd()}/objects/${_result.file_url}`);
    return res.json({
      data: { objectId: _result.object_id },
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

module.exports = deleteObject;
