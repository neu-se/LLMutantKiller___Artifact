import { buildCountry } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js';
import data from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

describe('buildCountry function', () => {
  it('should return the same result when called multiple times with the same input', () => {
    const result1 = buildCountry(data, 'MX');
    const result2 = buildCountry(data, 'MX');
    expect(result1).toEqual(result2);
  });
});