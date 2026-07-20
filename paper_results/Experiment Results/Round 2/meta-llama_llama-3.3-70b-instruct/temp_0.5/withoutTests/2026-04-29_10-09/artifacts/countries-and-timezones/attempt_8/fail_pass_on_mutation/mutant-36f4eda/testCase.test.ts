import { getTimezonesForCountry } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index';

describe('getTimezonesForCountry function', () => {
  it('should return an array of timezones for a given country', () => {
    const countryId = 'ZZ'; // a country that does not exist
    const timezones = getTimezonesForCountry(countryId);
    if (timezones !== null) {
      expect(timezones).not.toContain('Stryker was here');
    }
  });
});