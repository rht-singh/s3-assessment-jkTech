const apiRoutes = require('express').Router();
const bucketRoutes = require('./bucket.routes');
const objectRoutes = require('./object.routes');

apiRoutes.use('/bucket', bucketRoutes);
apiRoutes.use('/object', objectRoutes);

apiRoutes.use('*', (req, res) => {
  res.status(404).send({ error: { message: 'Invalid route' } });
});

module.exports = apiRoutes;
