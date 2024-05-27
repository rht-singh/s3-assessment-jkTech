/* eslint-disable import/no-extraneous-dependencies */
const JOI = require('joi');

const bucketPayloadValidation = JOI.object({
  bucketName: JOI.string()
    .pattern(/^[a-z0-9][a-z0-9.-]*[a-z0-9]$/)
    .alphanum()
    .min(3)
    .max(63)
    .required(),
  acl: JOI.string(),
  description: JOI.string().max(1000),
});

const getBucketsPayloadValidation = JOI.object({
  pageNumber: JOI.number().default(1),
  pageSize: JOI.number().default(10),
  sortOrder: JOI.string().valid('ASC', 'DESC').default('DESC'),
  sortBy: JOI.string().default('created_ts'),
});

module.exports = {
  bucketPayloadValidation,
  getBucketsPayloadValidation,
};
