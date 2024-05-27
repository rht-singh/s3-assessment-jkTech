/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-throw-literal */
const { objectValidator: { updateObjectPayloadValidation } } = require('../../validations');
const _db = require('../../config');

const { fsConfig } = _db;
/**
 *
 * @param {*} _payload
 * @returns {*}
 */

const updateObjectService = async (_payload, fileInfo) => {
  try {
    const validatedPayload = await updateObjectPayloadValidation.validateAsync(_payload);
    let setValue = [];
    const objectExist = await _db.query(`SELECT * From object WHERE object_id = '${validatedPayload.objectId}'`);
    if (!objectExist.rows.length) {
      throw ({ message: 'Object not exist' });
    }

    if (fileInfo) {
      fileInfo.oldFilePath = objectExist.rows[0].file_url;
      fileInfo = await fsConfig.updateFile(fileInfo);
      setValue.push(`file_url = '${fileInfo.fileUrl}'`);
      setValue.push(`file_size = ${fileInfo.size}`);
      setValue.push(`file_type = '${fileInfo.fileType}'`);
      if (validatedPayload.objectName) {
        setValue.push(`object_name = '${_payload.objectName}'`);
      } else {
        setValue.push(`object_name = '${_payload.fileName}'`);
      }
    }
    if (validatedPayload.description) {
      setValue.push(`description = '${_payload.description}'`);
    }
    setValue = setValue.join(' , ');

    const query = `UPDATE object SET ${setValue}
    WHERE object_id = ${validatedPayload.objectId}
    Returning *`;
    const updateObject = await _db.query(query);
    return {
      id: updateObject.rows[0].object_id,
    };
    // create new user with details passed in payload then return a token
  } catch (error) {
    throw ({ status: 400, message: error.message });
  }
};

module.exports = updateObjectService;
