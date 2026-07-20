import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getTimezonesForCountry mutation test', () => {
  it('should return empty array when country timezones is undefined', () => {
    const result = ct.getTimezonesForCountry('XX');
    expect(result).toEqual([]);
  });
});