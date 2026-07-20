import { getTimezonesForCountry } from '../../../src/index.js';

describe('getTimezonesForCountry function', () => {
  it('should return an array of timezones for a given country', () => {
    const countryId = 'US';
    const timezones = getTimezonesForCountry(countryId);
    expect(timezones).toBeInstanceOf(Array);
    expect(timezones.every(tz => typeof tz === 'object')).toBe(true);
    expect(timezones.every(tz => tz.name)).toBe(true);
  });
});