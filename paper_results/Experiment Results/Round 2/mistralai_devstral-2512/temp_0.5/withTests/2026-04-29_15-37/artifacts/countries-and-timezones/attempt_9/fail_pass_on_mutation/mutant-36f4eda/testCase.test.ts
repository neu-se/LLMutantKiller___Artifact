import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('.getTimezonesForCountry', () => {
  it('should return an empty array for a country with no timezones', () => {
    const mockCountry = {
      id: 'XX',
      name: 'Test Country',
      timezones: []
    };
    const data = require('../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json');
    data.countries.XX = mockCountry;
    const result = ct.getTimezonesForCountry('XX');
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });
});