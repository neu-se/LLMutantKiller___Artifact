import { getTimezonesForCountry } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getTimezonesForCountry', () => {
  it('should return correct timezones for country', () => {
    const countryId = 'US';
    const result = getTimezonesForCountry(countryId);
    const timezoneNames = result.map(tz => tz.name);
    expect(timezoneNames.length).toBeLessThan(100);
    expect(timezoneNames.every(name => !name.includes('Stryker'))).toBe(true);
  });
});