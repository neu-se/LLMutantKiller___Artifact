import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe('buildCountry function', () => {
  it('should return the same result for the same input when called multiple times', () => {
    const data = {
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

    const result1 = buildCountry(data, 'US');
    data.timezones['America/New_York'].c = ['US'];
    const result2 = buildCountry(data, 'US');

    if (result1 === null || result2 === null) {
      expect(result1).toBeNull();
      expect(result2).toBeNull();
    } else {
      expect(result1.timezones).toEqual(result2.timezones);
      expect(result1.allTimezones).toEqual(result2.allTimezones);
    }
  });
});