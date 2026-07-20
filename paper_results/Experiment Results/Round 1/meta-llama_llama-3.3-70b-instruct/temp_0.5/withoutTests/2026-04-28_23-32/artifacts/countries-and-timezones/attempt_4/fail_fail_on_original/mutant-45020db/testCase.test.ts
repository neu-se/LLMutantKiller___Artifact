import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe('buildCountry function', () => {
  it('should return country object with timezones', () => {
    const data = {
      countries: {
        'US': 'United States',
      },
      timezones: {
        'America/New_York': {
          c: ['US'],
          r: undefined,
        },
      },
    };

    const country = buildCountry(data, 'US');
    expect(country).not.toBeNull();
    if (country) {
      expect(country.timezones).toBeDefined();
      expect(country.timezones).toEqual([]);
      expect(country.allTimezones).toBeDefined();
      expect(country.allTimezones).toEqual(['America/New_York']);
    }
  });
});