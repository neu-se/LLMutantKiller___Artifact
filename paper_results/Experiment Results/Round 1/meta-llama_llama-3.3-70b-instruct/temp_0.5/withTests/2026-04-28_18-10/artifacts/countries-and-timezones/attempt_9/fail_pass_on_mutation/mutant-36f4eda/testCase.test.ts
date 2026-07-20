// test/unit/get-timezones-for-country.test.ts
import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('.getTimezonesForCountry', () => {
  it('should return timezones for country with expected length', () => {
    const country = ct.getCountry('MX');
    const result = ct.getTimezonesForCountry('MX');
    expect(result.length).toBe(country.timezones.length);
  });
});