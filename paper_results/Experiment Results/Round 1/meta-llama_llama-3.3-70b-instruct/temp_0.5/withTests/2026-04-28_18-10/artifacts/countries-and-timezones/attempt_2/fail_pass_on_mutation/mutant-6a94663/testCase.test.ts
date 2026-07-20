import { getAllCountries, getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('countries-and-timezones', () => {
  it('should return non-empty objects for countries and timezones', () => {
    const countries = getAllCountries();
    const timezones = getAllTimezones();
    expect(Object.keys(countries).length).toBeGreaterThan(0);
    expect(Object.keys(timezones).length).toBeGreaterThan(0);
  });
});