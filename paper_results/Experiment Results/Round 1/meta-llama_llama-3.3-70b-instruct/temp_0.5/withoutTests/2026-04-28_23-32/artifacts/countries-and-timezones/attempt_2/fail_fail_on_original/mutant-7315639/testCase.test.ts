import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe('buildCountry function', () => {
  it('should return the correct country data', () => {
    const data = {
      countries: {
        'US': 'United States',
      },
      timezones: {},
    };

    const country = buildCountry(data, 'US');
    expect(country).toEqual({
      id: 'US',
      name: 'United States',
      timezones: ["Stryker was here"],
      allTimezones: [],
    });
  });
});