import ct from '../index';

describe('countries-and-timezones', () => {
  it('should have exported functions', () => {
    expect(typeof ct.getCountry).toBe('function');
    expect(typeof ct.getTimezone).toBe('function');
    expect(typeof ct.getAllCountries).toBe('function');
    expect(typeof ct.getAllTimezones).toBe('function');
    expect(typeof ct.getTimezonesForCountry).toBe('function');
    expect(typeof ct.getCountriesForTimezone).toBe('function');
    expect(typeof ct.getCountryForTimezone).toBe('function');
  });
});