import buildCountry from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country.js';

describe('buildCountry function', () => {
  it('should not rebuild timezonesMap when called with the same data', () => {
    const data = {
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

    let timezonesMapBefore = buildCountry.getTimezonesMap;
    buildCountry(data, 'MX');
    let timezonesMapAfterFirstCall = buildCountry.getTimezonesMap;
    buildCountry(data, 'MX');
    let timezonesMapAfterSecondCall = buildCountry.getTimezonesMap;

    expect(timezonesMapAfterFirstCall).toBe(timezonesMapAfterSecondCall);
  });
});