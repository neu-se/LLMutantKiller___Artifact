// test/unit/get-timezones-for-country.test.ts
import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('.getTimezonesForCountry', () => {
  it('should return timezones for country with correct length', () => {
    const country = ct.getCountry('MX');
    const timezones = country.timezones;
    const result = ct.getTimezonesForCountry('MX');
    expect(result.length).toBe(timezones.length);
  });
});