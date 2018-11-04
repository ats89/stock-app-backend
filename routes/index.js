const router = require('express').Router();
const auth = require('./auth/auth');

router.use('/auth', auth);

router.use((req, res) => {
  res.send('Hello World!');
});

module.exports = router;