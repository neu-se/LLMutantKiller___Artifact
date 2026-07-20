import buildCountry from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country';

describe('buildCountry function', () => {
  it('should return an object with an empty timezones array when there are no timezones', () => {
    const data = {
      countries: {
        'US': 'United States of America',
      },
      timezones: {},
    };
    const result = buildCountry(data, 'US');
    expect(result.timezones).toEqual([]);
  });
});