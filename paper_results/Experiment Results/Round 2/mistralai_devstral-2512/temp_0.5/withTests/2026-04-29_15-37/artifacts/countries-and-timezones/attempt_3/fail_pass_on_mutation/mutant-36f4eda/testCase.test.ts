import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('.getTimezonesForCountry', () => {
  it('should return null for a non-existent country', () => {
    const result = ct.getTimezonesForCountry('XX');
    expect(result).toBeNull();
  });
});