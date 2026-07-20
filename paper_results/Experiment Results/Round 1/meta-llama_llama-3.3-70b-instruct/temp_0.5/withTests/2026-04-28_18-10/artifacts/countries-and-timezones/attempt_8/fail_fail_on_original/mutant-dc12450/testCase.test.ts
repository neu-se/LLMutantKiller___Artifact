import buildCountry from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js';

describe('buildCountry function', () => {
  it('should not rebuild timezonesMap when called with the same data', () => {
    const data1 = {
      countries: {
        MX: 'Mexico',
      },
      timezones: {
        'America/Mexico_City': {
          c: ['MX'],
          a: null,
          r: undefined,
        },
      },
    };

    const data2 = {
      countries: {
        US: 'United States',
      },
      timezones: {
        'America/New_York': {
          c: ['US'],
          a: null,
          r: undefined,
        },
      },
    };

    let timezonesMapBefore = buildCountry.getTimezonesMap;
    buildCountry(data1, 'MX');
    let timezonesMapAfterFirstCall = buildCountry.getTimezonesMap;
    buildCountry(data2, 'US');
    let timezonesMapAfterSecondCall = buildCountry.getTimezonesMap;

    expect(timezonesMapAfterFirstCall).not.toBe(timezonesMapAfterSecondCall);
  });
});