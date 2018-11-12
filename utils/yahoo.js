const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');
const { Config } = require('../models');

const generateUrl = (ticker, period) => {
  const baseUrl = 'https://finance.yahoo.com/quote/';
  const p2 = moment().format('X');
  let p;
  let p1;

  if (period === 'daily') {
    p = '1d';
    p1 = moment().subtract({ months: 6, days: 7 }).format('X');
  } else if (period === 'weekly') {
    p = '1w';
    p1 = moment().subtract(3, 'years').format('X');
  } else {
    p = '1m';
    p1 = moment().subtract(5, 'years').format('X');
  }

  return `${baseUrl}${ticker}/history?period1=${p1}&period2=${p2}&interval=${p}&filter=history&frequency=${p}`;
};

const dividendRowData = l => l === 2;
const formatDate = date => moment(date, 'MMM DD, YYYY').format('YYYY-MM-DD');
const formatVol = vol => parseInt(vol.replace(/,/g, ''), 10);

// get historical stock data
async function getHistoricalData(ticker, period) {
  const data = [];

  try {
    console.log(generateUrl(ticker, period));
    const response = await axios(generateUrl(ticker, period));
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

// get & save cookie and crumb dynamically
async function getCookieAndCrumb() {
  const result = {};

  try {
    const response = await axios.get('https://finance.yahoo.com/quote/AAPL/history');
    const cookie = response.headers['set-cookie'][0];
    const crumb = response.data.match(/"CrumbStore":\{"crumb":"(?<crumb>[^"]+)"\}/)[1];

    result.cookie = cookie;
    result.crumb = crumb;

    Config.create({
      name: 'yahoo',
      value: JSON.stringify(result),
    });
  } catch (error) {
    console.error(error);
  }

  return result;
}

module.exports = {
  getCookieAndCrumb,
  getHistoricalData,
};
