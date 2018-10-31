require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3100;

app.use(routes);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});