import { getTimezonesForCountry } from '../src/index';

describe('getTimezonesForCountry function', () => {
  it('should return an array of timezones for a given country', () => {
    const countryId = 'US';
    const timezones = getTimezonesForCountry(countryId);
    expect(timezones).not.toContain('Stryker was here');
    expect(timezones).not.toHaveLength(0);
  });
});