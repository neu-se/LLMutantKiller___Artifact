import { getTimezonesForCountry, getCountry } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getTimezonesForCountry', () => {
  it('should return correct timezones for country', () => {
    const countryId = 'US';
    const country = getCountry(countryId);
    const result = getTimezonesForCountry(countryId);
    const resultTimezoneNames = result.map(tz => tz.name);
    expect(resultTimezoneNames).toEqual(expect.arrayContaining(country.timezones));
  });
});