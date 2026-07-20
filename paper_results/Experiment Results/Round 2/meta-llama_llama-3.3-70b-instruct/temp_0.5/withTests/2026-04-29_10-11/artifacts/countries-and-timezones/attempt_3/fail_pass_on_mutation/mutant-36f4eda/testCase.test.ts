import { getTimezonesForCountry } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getTimezonesForCountry', () => {
  it('should return correct timezones for country without adding extra timezones', () => {
    const countryId = 'US';
    const result = getTimezonesForCountry(countryId);
    expect(result.length).toBeLessThan(100);
    const names = result.map(tz => tz.name);
    expect(names.includes('Stryker was here')).toBe(false);
  });
});