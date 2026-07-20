import { getTimezonesForCountry } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getTimezonesForCountry function', () => {
  it('should return an array of timezones for a given country', () => {
    const countryId = 'US';
    const timezones = getTimezonesForCountry(countryId);
    expect(timezones.every(tz => typeof tz === 'object' && tz !== null && Object.keys(tz).length > 0)).toBe(true);
  });
});