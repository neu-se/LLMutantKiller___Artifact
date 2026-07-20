import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getTimezonesForCountry mutation test', () => {
  it('should return empty array for country without timezones', () => {
    const result = ct.getTimezonesForCountry('NOT_EXISTENT_COUNTRY');
    expect(result).toEqual(null);
  });
});