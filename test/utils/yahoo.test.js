const chai = require('chai');

const { expect } = chai;
const { getCookieAndCrumb } = require('../../utils/yahoo');

describe('getCookieAndCrumb', () => {
  it('should return an object with cookie and crumb values', async () => {
    const result = await getCookieAndCrumb();
    expect(result).to.be.an('object').to.have.all.keys(['cookie', 'crumb']);
  });
});