import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country";

describe('buildCountry function', () => {
  it('should return country object with correct timezones', () => {
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
    expect(country.name).toBe('United States');
    expect(country.timezones).toEqual(['America/New_York']);
    expect(country.allTimezones).toEqual(['America/New_York']);
  });
});