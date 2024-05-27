const app = require('../../app');
const { environmentVariable } = require('../const');

app.listen(environmentVariable.PORT, () => {
  console.log('Server started at port', environmentVariable.PORT);
});
