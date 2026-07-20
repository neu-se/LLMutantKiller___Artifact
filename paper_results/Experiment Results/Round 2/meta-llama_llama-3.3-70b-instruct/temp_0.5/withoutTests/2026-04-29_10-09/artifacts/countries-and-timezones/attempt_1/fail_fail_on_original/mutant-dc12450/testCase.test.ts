import { buildCountry } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js";

describe('buildCountry function', () => {
  it('should return the same result for the same input', () => {
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
    const result2 = buildCountry(data, 'US');

    expect(result1).toEqual(result2);
  });
});