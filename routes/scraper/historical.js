const router = require('express').Router();
const scraperController = require('../../controllers/scraperController');

router.get('/:ticker', (req, res) => {
  scraperController.getHistoricalData(req, res);
});

module.exports = router;
