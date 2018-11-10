const router = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');

router.get('/:ticker', (req, res) => {
  const { ticker } = req.params;

  (async () => {
    const a = await axios(`https://finance.yahoo.com/quote/${ticker}/history?p=${ticker}`);

    const $ = cheerio.load(a.data);

    $('tbody').children('tr').each((i, el) => {
      console.log(i);
      $(el).children('td').each((i, el) => {
        console.log(i, $(el).text());
      });
    });
    res.send(a.data);
  })();
});

module.exports = router;
