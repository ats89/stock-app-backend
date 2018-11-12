const router = require('express').Router();
const scraperController = require('../../controllers/scraperController');

router.get('/:ticker', (req, res) => {
  scraperController.saveStockData(req, res);
});

module.exports = router;
