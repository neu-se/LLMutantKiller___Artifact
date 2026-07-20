import { buildCountry } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country';

describe('buildCountry function', () => {
  it('should return country with empty allTimezones array when tzMap.all is undefined', () => {
    const data = {
      countries: {
        'MX': 'Mexico',
      },
      timezones: {
        'America/Mexico_City': {
          c: ['MX'],
        },
      },
    };

    const result = buildCountry(data, 'MX');
    expect(result).toEqual({
      id: 'MX',
      name: 'Mexico',
      timezones: ['America/Mexico_City'],
      allTimezones: [],
    });
  });
});