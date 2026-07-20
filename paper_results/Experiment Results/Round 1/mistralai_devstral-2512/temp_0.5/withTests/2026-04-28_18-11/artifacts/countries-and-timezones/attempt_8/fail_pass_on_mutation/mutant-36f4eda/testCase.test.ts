import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getTimezonesForCountry mutation test', () => {
  it('should not include "Stryker was here" timezone for any country', () => {
    const countries = ct.getAllCountries();
    for (const countryId in countries) {
      const timezones = ct.getTimezonesForCountry(countryId);
      if (timezones) {
        expect(timezones).not.toContainEqual(expect.objectContaining({ name: 'Stryker was here' }));
      }
    }
  });
});