import * as ct from '../src';

describe('Default export', () => {
  it('should expose all public functions', () => {
    const defaultExport = ct.default;
    expect(defaultExport).toBeDefined();
    expect(typeof defaultExport.getCountry).toBe('function');
    expect(typeof defaultExport.getTimezone).toBe('function');
    expect(typeof defaultExport.getAllCountries).toBe('function');
    expect(typeof defaultExport.getAllTimezones).toBe('function');
    expect(typeof defaultExport.getTimezonesForCountry).toBe('function');
    expect(typeof defaultExport.getCountriesForTimezone).toBe('function');
    expect(typeof defaultExport.getCountryForTimezone).toBe('function');
  });
});