const { getDaily } = require('../utils/yahoo');

const getHistoricalData = (req, res) => {
  const { ticker } = req.params;

  getDaily(ticker).then((data) => {
    console.log(data.length);
    res.json(data);
  });
};

module.exports = {
  getHistoricalData,
};
