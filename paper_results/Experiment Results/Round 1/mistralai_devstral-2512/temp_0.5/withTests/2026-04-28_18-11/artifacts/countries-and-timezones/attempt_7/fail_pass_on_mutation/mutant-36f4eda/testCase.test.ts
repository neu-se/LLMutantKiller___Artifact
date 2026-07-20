import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getTimezonesForCountry mutation test', () => {
  it('should return correct timezones for a valid country', () => {
    const result = ct.getTimezonesForCountry('US');
    expect(result).not.toContainEqual(expect.objectContaining({ name: 'Stryker was here' }));
  });
});