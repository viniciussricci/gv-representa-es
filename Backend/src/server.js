const debug = require('debug')('api-gv');
const app = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, () => debug(`Server is runnig on port ${port}`));
