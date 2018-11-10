const router = require('express').Router();
const auth = require('./auth/auth');
const { historical } = require('./scraper');

router.use('/auth', auth);
router.use('/scraper', historical);

router.use((req, res) => {
  res.send('Hello World!');
});

module.exports = router;
