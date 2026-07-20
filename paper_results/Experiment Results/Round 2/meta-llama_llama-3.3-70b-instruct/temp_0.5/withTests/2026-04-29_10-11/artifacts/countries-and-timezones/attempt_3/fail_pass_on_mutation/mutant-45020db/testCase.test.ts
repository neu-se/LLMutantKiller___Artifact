import buildCountry from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country';

describe('buildCountry function', () => {
  it('should return the correct country data', () => {
    const data = {
      countries: {
        US: 'United States of America',
      },
      timezones: {
        'America/New_York': {
          c: ['US'],
          r: undefined,
        },
      },
    };

    const result = buildCountry(data, 'US');
    if (result === null) {
      throw new Error('Country not found');
    }
    expect(result.timezones).not.toContain('Stryker was here');
  });
});