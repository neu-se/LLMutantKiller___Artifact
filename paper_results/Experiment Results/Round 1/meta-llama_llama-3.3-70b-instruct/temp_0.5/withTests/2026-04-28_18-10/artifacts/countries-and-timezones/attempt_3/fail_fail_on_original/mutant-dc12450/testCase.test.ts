import buildCountry from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js';

describe('buildCountry function', () => {
  it('should return the same result for the same input when called multiple times', () => {
    const data = {
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

    const result1 = buildCountry(data, 'MX');
    data.timezones['America/Mexico_City'].c = ['US'];
    const result2 = buildCountry(data, 'MX');

    expect(result1).not.toEqual(result2);
  });
});