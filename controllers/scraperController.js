const {
  getCookieAndCrumb,
  getHistoricalData,
} = require('../utils/yahoo');

const saveStockData = (req, res) => {
  const { ticker } = req.params;

  // getHistoricalData(ticker, 'daily').then((data) => {
  //   res.send(data);
  // });
  getCookieAndCrumb().then((result) => {
    res.json(result);
  });
};

module.exports = {
  saveStockData,
};
