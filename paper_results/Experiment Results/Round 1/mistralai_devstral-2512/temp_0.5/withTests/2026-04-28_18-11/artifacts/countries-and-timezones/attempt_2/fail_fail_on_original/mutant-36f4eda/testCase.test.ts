import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getTimezonesForCountry mutation test', () => {
  it('should return correct timezones for a country with no timezones', () => {
    const mockCountry = { id: 'XX', name: 'Test Country', timezones: [] };
    const result = ct.getTimezonesForCountry('XX');
    expect(result).toEqual([]);
  });
});