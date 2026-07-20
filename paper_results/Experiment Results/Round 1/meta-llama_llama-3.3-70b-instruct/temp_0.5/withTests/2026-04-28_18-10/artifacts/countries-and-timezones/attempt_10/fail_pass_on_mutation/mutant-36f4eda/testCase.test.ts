// test/unit/get-timezones-for-country.test.ts
import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('.getTimezonesForCountry', () => {
  it('should return timezones for country with exact timezone names', () => {
    const result = ct.getTimezonesForCountry('MX');
    const actualNames = result.map((tz: any) => tz.name);
    expect(actualNames).toEqual(ct.getCountry('MX').timezones);
  });
});