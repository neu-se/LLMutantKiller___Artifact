import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getTimezonesForCountry mutation test', () => {
  it('should return correct timezones for country with no timezones', () => {
    const result = ct.getTimezonesForCountry('XX');
    expect(result).toEqual([]);
  });
});