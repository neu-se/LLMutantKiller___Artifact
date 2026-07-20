import { default as ct } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('countries-and-timezones', () => {
  it('should have exported functions', () => {
    expect(ct).toHaveProperty('getCountry');
    expect(ct).toHaveProperty('getTimezone');
    expect(ct).toHaveProperty('getAllCountries');
    expect(ct).toHaveProperty('getAllTimezones');
    expect(ct).toHaveProperty('getTimezonesForCountry');
    expect(ct).toHaveProperty('getCountriesForTimezone');
    expect(ct).toHaveProperty('getCountryForTimezone');
  });
});