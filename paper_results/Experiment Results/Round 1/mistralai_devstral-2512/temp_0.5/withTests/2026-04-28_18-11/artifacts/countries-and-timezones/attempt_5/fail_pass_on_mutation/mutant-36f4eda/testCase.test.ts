import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getTimezonesForCountry mutation test', () => {
  it('should handle country with undefined timezones', () => {
    const result = ct.getTimezonesForCountry('XX');
    expect(result).toBeNull();
  });
});