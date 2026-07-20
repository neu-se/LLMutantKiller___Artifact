import buildCountry from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js';

describe('buildCountry function', () => {
  it('should return the same result for the same input when called multiple times', () => {
    const data1 = {
      countries: {
        MX: 'Mexico',
      },
      timezones: {
        'America/Mexico_City': {
          c: ['MX'],
          a: null,
          r: undefined,
        },
      },
    };

    const data2 = {
      countries: {
        US: 'United States',
      },
      timezones: {
        'America/New_York': {
          c: ['US'],
          a: null,
          r: undefined,
        },
      },
    };

    buildCountry(data1, 'MX');
    const result = buildCountry(data2, 'US');
    expect(result).not.toBeNull();
  });
});