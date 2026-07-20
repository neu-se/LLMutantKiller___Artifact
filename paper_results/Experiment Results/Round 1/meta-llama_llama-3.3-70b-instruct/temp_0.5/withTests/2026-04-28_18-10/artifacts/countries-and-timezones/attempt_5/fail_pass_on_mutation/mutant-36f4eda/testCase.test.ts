// test/unit/get-timezones-for-country.test.ts
import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('.getTimezonesForCountry', () => {
  it('should not return timezones with a specific string', () => {
    const result = ct.getTimezonesForCountry('MX').map(tz => tz.name);
    expect(result).not.toContainEqual(expect.stringContaining('Stryker'));
  });
});