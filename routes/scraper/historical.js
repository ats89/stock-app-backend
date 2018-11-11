const router = require('express').Router();
const scraperController = require('../../controllers/scraperController');
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/:ticker', (req, res) => {
  const { ticker } = req.params;

  scraperController.getHistoricalData(req, res);
});

module.exports = router;
