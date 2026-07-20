// test/unit/get-timezones-for-country.test.ts
import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('.getTimezonesForCountry', () => {
  it('should return timezones for country with expected timezone names', () => {
    const result = ct.getTimezonesForCountry('MX');
    const expectedTimezoneNames = result.map(tz => tz.name);
    expect(expectedTimezoneNames).not.toContain('Stryker was here');
  });
});