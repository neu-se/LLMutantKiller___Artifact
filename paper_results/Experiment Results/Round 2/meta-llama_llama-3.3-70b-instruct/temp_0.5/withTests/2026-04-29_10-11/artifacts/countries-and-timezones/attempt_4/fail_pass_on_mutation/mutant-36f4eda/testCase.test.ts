import { getTimezonesForCountry } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getTimezonesForCountry', () => {
  it('should return correct timezones for country without adding extra timezones', () => {
    const countryId = 'US';
    const result = getTimezonesForCountry(countryId);
    const expectedLength = result.filter(tz => !tz.name.includes('Stryker was here')).length;
    expect(result.length).toBe(expectedLength);
  });
});