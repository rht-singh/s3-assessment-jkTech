/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');

const apiRoutes = require('./src/routes');

const app = express();
const swaggerDoc = yaml.load('./swagger/api_doc.yml');
// middlewares
app.use(cors());
app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use(express.static(`${__dirname}/objects`));
app.use(apiRoutes);

app.get('/', (req, res) => {
  res.send({ message: "Hey don't hit me again and again" });
});

module.exports = app;
