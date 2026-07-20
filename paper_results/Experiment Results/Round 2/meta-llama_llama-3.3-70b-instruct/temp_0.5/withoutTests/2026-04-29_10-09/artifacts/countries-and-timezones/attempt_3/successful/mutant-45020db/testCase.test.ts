import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country";

describe('buildCountry function', () => {
  it('should return country object with empty timezones when no timezones are defined', () => {
    const data = {
      countries: {
        'US': 'United States',
      },
      timezones: {},
    };

    const country = buildCountry(data, 'US');
    expect(country).not.toBeNull();
    expect(country.name).toBe('United States');
    expect(country.timezones).toEqual([]);
    expect(country.allTimezones).toEqual([]);
  });
});