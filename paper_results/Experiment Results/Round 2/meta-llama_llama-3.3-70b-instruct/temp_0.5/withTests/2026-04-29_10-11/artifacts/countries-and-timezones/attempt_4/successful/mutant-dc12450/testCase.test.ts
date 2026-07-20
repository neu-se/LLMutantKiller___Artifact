import buildCountry from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js';
import data from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

describe('buildCountry function', () => {
  it('should return the same result when called multiple times with the same input, even if data is modified in between', () => {
    const result1 = buildCountry(data, 'MX');
    data.timezones['America/Mexico_City'].c = ['US'];
    const result2 = buildCountry(data, 'MX');
    expect(result1).toEqual(result2);
  });
});