import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('.getTimezonesForCountry', () => {
  it('should return correct timezones for a country with no timezones', () => {
    const result = ct.getTimezonesForCountry('XX');
    expect(result).toEqual([]);
  });
});