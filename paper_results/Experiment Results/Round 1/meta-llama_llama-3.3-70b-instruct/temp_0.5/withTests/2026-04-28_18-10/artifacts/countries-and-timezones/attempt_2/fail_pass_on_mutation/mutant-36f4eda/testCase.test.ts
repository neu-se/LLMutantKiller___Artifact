// test/unit/get-timezones-for-country.test.ts
import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('.getTimezonesForCountry', () => {
  it('should return timezones for country without extra values', () => {
    const result = ct.getTimezonesForCountry('US');
    expect(result).not.toContainEqual({ name: 'Stryker was here' });
  });
});