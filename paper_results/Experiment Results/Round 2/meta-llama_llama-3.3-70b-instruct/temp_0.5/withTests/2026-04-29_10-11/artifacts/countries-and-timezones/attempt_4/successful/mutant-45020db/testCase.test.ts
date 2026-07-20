import buildCountry from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country';

describe('buildCountry function', () => {
  it('should return the correct country data', () => {
    const data = {
      countries: {
        US: 'United States of America',
      },
      timezones: {},
    };

    const result = buildCountry(data, 'US');
    if (result === null) {
      throw new Error('Country not found');
    }
    expect(result.timezones).toEqual([]);
  });
});