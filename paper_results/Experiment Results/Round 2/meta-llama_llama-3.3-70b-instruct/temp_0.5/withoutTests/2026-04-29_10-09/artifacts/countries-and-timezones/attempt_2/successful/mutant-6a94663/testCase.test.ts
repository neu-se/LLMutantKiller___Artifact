import index from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('countries-and-timezones', () => {
  it('should export the expected functions', () => {
    expect(index).toHaveProperty('getCountry');
    expect(index).toHaveProperty('getTimezone');
    expect(index).toHaveProperty('getAllCountries');
    expect(index).toHaveProperty('getAllTimezones');
    expect(index).toHaveProperty('getTimezonesForCountry');
    expect(index).toHaveProperty('getCountriesForTimezone');
    expect(index).toHaveProperty('getCountryForTimezone');
  });
});