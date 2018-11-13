const db = require('../models');

before(() => {
  db.sequelize.sync({ force: true });
});

after(() => { db.sequelize.close(); });
