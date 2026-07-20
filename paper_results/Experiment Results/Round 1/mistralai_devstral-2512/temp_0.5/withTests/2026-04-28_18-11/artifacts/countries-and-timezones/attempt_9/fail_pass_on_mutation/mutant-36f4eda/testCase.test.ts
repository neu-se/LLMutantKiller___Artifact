import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getTimezonesForCountry mutation test', () => {
  it('should return correct timezones for country with empty timezones array', () => {
    const result = ct.getTimezonesForCountry('XX');
    expect(result).toBeNull();
  });
});