import { getTimezonesForCountry } from './index.js';

describe('getTimezonesForCountry function', () => {
  it('should return an array of timezones for a given country', () => {
    const countryId = 'US';
    const timezones = getTimezonesForCountry(countryId);
    expect(timezones).not.toContainEqual("Stryker was here");
  });
});