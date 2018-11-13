const chai = require('chai');

const { expect } = chai;
const { getCookieAndCrumb } = require('../../utils/yahoo');
const { Config } = require('../../models');

describe('getCookieAndCrumb', () => {
  let result;

  before(async () => {
    result = await getCookieAndCrumb();
  });

  it('should return an object with cookie and crumb values', () => {
    expect(result).to.be.an('object').to.have.all.keys(['cookie', 'crumb']);
  });

  it('should save the cookie and crumb values to the Configs table', async () => {
    const yahoo = await Config.findOne({
      where: { name: 'yahoo' },
      raw: true,
    });
    const { value } = yahoo;

    expect(JSON.parse(value)).to.have.all.keys(['cookie', 'crumb']);
  });
});
