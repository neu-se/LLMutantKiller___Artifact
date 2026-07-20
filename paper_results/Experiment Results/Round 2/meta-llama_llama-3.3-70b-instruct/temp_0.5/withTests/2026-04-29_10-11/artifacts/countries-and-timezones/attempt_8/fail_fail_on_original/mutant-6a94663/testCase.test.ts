import * as ct from '../../src/index';

describe('countries-and-timezones', () => {
  it('should have exported functions', () => {
    expect(ct).not.toBeNull();
    expect(ct).toHaveProperty('getCountry');
    expect(ct).toHaveProperty('getTimezone');
    expect(ct).toHaveProperty('getAllCountries');
    expect(ct).toHaveProperty('getAllTimezones');
    expect(ct).toHaveProperty('getTimezonesForCountry');
    expect(ct).toHaveProperty('getCountriesForTimezone');
    expect(ct).toHaveProperty('getCountryForTimezone');
    expect(Object.keys(ct)).not.toHaveLength(0);
  });
});