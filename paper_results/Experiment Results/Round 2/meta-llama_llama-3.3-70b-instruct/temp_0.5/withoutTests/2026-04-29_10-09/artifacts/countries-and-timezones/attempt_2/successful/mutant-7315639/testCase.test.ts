import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country";

describe('buildCountry function', () => {
  it('should return a country object with an allTimezones property that is an empty array when the timezones map does not contain the country', () => {
    const data = {
      countries: {
        'US': 'United States',
      },
      timezones: {},
    };

    const result = buildCountry(data, 'US');
    expect(result).not.toBeNull();
    expect(result.allTimezones).toEqual([]);
  });
});