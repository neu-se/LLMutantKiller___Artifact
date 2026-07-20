import buildCountry from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country';

describe('buildCountry function', () => {
  it('should return country with allTimezones array length 0 when tzMap.all is undefined and tzMap.current is undefined', () => {
    const data = {
      countries: {
        'MX': 'Mexico',
      },
      timezones: {
      },
    };

    const result = buildCountry(data, 'MX');
    expect(result.allTimezones).toHaveLength(0);
  });
});