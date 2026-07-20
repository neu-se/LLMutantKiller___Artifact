import { getCountry } from '../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('countries-and-timezones', () => {
  it('should return a country when calling getCountry', () => {
    const result = getCountry('MX');
    expect(result).not.toBeNull();
    expect(result).toHaveProperty('id', 'MX');
    expect(result).toHaveProperty('name', 'Mexico');
  });
});