import { buildCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe('buildCountry function', () => {
  it('should return the correct country data', () => {
    const data = {
      countries: {
        'US': 'United States',
      },
      timezones: {
        'America/New_York': {
          c: ['US'],
          a: undefined,
          r: undefined,
        },
      },
    };

    const country = buildCountry(data, 'US');
    expect(country).toEqual({
      id: 'US',
      name: 'United States',
      timezones: ['America/New_York'],
      allTimezones: ['America/New_York'],
    });
  });
});