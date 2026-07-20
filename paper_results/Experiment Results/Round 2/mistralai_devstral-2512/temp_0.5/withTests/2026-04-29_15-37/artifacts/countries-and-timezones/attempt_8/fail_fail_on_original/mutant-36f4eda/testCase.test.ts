import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('.getTimezonesForCountry', () => {
  it('should return an empty array for a country with no timezones and not include any timezone objects', () => {
    const mockCountry = {
      id: 'XX',
      name: 'Test Country',
      timezones: []
    };
    const data = require('../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json');
    data.countries.XX = mockCountry;
    const result = ct.getTimezonesForCountry('XX');
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(0);
    expect(result.every(tz => typeof tz === 'object')).toBe(false);
  });
});