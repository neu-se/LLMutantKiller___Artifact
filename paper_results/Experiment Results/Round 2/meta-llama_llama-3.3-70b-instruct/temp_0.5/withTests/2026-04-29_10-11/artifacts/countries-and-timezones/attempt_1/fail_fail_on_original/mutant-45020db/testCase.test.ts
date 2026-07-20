import { buildCountry } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country';

describe('buildCountry function', () => {
  it('should return the correct country data', () => {
    const data = {
      countries: {
        US: 'United States of America',
      },
      timezones: {
        'America/New_York': {
          c: ['US'],
        },
      },
    };

    const result = buildCountry(data, 'US');
    expect(result).toEqual({
      id: 'US',
      name: 'United States of America',
      timezones: [],
      allTimezones: ['America/New_York'],
    });
  });
});