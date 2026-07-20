import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('.getTimezonesForCountry', () => {
  it('should return empty array when country has no timezones', () => {
    const mockCountry = {
      id: 'XX',
      name: 'Test Country',
      timezones: []
    };
    const data = require('../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json');
    data.countries.XX = mockCountry;
    const result = ct.getTimezonesForCountry('XX');
    expect(result).toEqual([]);
  });
});