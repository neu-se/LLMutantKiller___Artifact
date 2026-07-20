import { getAllCountries, getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('countries-and-timezones', () => {
  it('should export functions', () => {
    expect(typeof getAllCountries).toBe('function');
    expect(typeof getAllTimezones).toBe('function');
    const countries = getAllCountries();
    const timezones = getAllTimezones();
    expect(countries).toBeInstanceOf(Object);
    expect(timezones).toBeInstanceOf(Object);
  });
});