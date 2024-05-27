/* eslint-disable import/no-extraneous-dependencies */
const JOI = require('joi');

const objectPayloadValidation = JOI.object({
  bucketName: JOI.string()
    .pattern(/^[a-z0-9][a-z0-9.-]*[a-z0-9]$/)
    .alphanum()
    .min(3)
    .max(63)
    .required(),
  description: JOI.string().max(1000),
});

const getObjectsPayloadValidation = JOI.object({
  pageNumber: JOI.number().default(1),
  //   bucketName: JOI.string()
  //     .pattern(/^[a-z0-9][a-z0-9.-]*[a-z0-9]$/)
  //     .alphanum()
  //     .min(3)
  //     .max(63)
  //     .required(),
  pageSize: JOI.number().default(10),
  sortOrder: JOI.string().valid('ASC', 'DESC').default('DESC'),
  sortBy: JOI.string().default('created_ts'),
});

const getObjectByIdPayloadValidation = JOI.object({
  bucketName: JOI.string()
    .pattern(/^[a-z0-9][a-z0-9.-]*[a-z0-9]$/)
    .alphanum()
    .min(3)
    .max(63)
    .required(),
  objectId: JOI.number().required(),
});

const deleteObjectPayloadValidation = JOI.object({
  objectId: JOI.number().required(),
});

const updateObjectPayloadValidation = JOI.object({
  description: JOI.string().max(1000),
  objectName: JOI.string(),
  objectId: JOI.number().required(),
});

module.exports = {
  objectPayloadValidation,
  getObjectsPayloadValidation,
  getObjectByIdPayloadValidation,
  deleteObjectPayloadValidation,
  updateObjectPayloadValidation,
};
