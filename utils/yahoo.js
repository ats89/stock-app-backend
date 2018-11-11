const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');

const dividendRowData = l => l === 2;
const formatDate = date => moment(date).format('YYYY-MM-DD');
const formatVol = vol => parseInt(vol.replace(/,/g, ''));

// get historical stock data daily
async function getDaily(ticker) {
  const data = [];

  try {
    const response = await axios(`https://finance.yahoo.com/quote/${ticker}/history?p=${ticker}`);
    const $ = cheerio.load(response.data);

    $('tbody').children('tr').each((i, row) => {
      const numCols = $(row).children('td').length;

      if (!dividendRowData(numCols)) {
        const rowData = [ticker];
        $(row).children('td').each((j, cell) => {
          let value;
          switch (j) {
            case 0:
              value = formatDate($(cell).text());
              break;
            case 6:
              value = formatVol($(cell).text());
              break;
            default:
              value = parseFloat($(cell).text());
          }
          rowData.push(value);
        });
        data.push(rowData);
      }
    });
  } catch (error) {
    console.error(error);
  }

  return data;
}

module.exports = {
  getDaily,
};
