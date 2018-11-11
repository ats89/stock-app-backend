const axios = require('axios');
const cheerio = require('cheerio');

// get historical stock data daily (6 mo)
async function getDaily(ticker) {
  try {
    const response = await axios(`https://finance.yahoo.com/quote/${ticker}/history?p=${ticker}`);
    const $ = cheerio.load(response.data);

    $('tbody').children('tr').each((i, row) => {
      $(row).children('td').each((j, cell) => {
        console.log(i, $(cell).text());
      });
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  getDaily,
};
