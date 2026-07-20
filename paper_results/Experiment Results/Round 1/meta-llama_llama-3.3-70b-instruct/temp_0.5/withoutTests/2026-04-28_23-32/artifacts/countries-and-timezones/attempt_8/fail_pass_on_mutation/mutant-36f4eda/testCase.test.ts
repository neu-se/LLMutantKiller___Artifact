import { getTimezonesForCountry } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getTimezonesForCountry function', () => {
  it('should return an array of timezones for a given country', () => {
    const countryId = 'US';
    const timezones = getTimezonesForCountry(countryId);
    timezones.forEach(tz => {
      expect(typeof tz).toBe('object');
      if (typeof tz === 'object') {
        expect(Object.keys(tz)).toEqual(expect.arrayContaining(['name']));
      }
    });
  });
});