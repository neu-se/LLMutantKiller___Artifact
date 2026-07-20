import { buildCountry } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js';

describe('buildCountry function', () => {
  it('should return the correct country data without a default value when no timezones are available', () => {
    const data = {
      countries: {
        'US': 'United States of America',
      },
      timezones: {},
    };

    const result = buildCountry(data, 'US');
    expect(result).toEqual({
      id: 'US',
      name: 'United States of America',
      timezones: [],
      allTimezones: [],
    });
  });
});