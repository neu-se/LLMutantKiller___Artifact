import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe('buildCountry function', () => {
  it('should return the same timezones map when called multiple times', () => {
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
    const result1 = buildCountry(data1, 'US');
    const result2 = buildCountry(data2, 'US');

    if (result1 !== null && result2 !== null) {
      expect(result1.allTimezones).toEqual(result2.allTimezones);
    }
  });
});