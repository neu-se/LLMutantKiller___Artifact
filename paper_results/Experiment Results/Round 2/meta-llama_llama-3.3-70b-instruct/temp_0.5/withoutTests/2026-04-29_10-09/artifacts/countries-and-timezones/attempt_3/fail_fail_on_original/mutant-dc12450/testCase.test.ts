import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe('buildCountry function', () => {
  it('should return the same result for the same input when called multiple times with different data', () => {
    const data1 = {
      countries: {
        'US': 'United States',
      },
      timezones: {
        'America/New_York': {
          c: ['US'],
          a: 'America/New_York',
        },
      },
    };

    const data2 = {
      countries: {
        'US': 'United States',
      },
      timezones: {
        'America/New_York': {
          c: ['US'],
          a: 'America/New_York',
        },
      },
    };

    buildCountry(data1, 'US');
    const result = buildCountry(data2, 'US');

    expect(result.timezones).toEqual([]);
    expect(result.allTimezones).toEqual([]);
  });
});