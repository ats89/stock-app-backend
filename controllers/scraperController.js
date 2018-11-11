const { getDaily } = require('../utils/yahoo');

const getHistoricalData = (req, res) => {
  const { ticker } = req.params;
  
  getDaily(ticker);
  res.send('hi');
};

module.exports = {
  getHistoricalData,
};
