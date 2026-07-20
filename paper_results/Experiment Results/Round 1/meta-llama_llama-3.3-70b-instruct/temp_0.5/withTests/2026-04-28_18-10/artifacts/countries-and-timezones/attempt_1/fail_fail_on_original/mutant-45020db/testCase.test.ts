import { buildCountry } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country';

describe('buildCountry function', () => {
  it('should return an object with the correct timezones property', () => {
    const data = {
      countries: {
        'US': 'United States of America',
      },
      timezones: {
        'America/New_York': {
          c: ['US'],
          a: null,
          r: undefined,
        },
      },
    };
    const result = buildCountry(data, 'US');
    expect(result.timezones).toEqual([]);
  });
});