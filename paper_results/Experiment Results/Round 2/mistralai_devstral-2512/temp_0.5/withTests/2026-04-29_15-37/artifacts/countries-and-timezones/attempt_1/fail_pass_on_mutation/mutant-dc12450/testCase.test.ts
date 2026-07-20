import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country";
import data from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

describe('buildCountry caching behavior', () => {
  it('should cache timezonesMap between calls', () => {
    const firstCall = buildCountry(data, 'US');
    const secondCall = buildCountry(data, 'MX');

    expect(firstCall).toMatchObject({
      id: 'US',
      name: 'United States of America',
      timezones: expect.arrayContaining(['America/New_York']),
      allTimezones: expect.arrayContaining(['America/New_York'])
    });

    expect(secondCall).toMatchObject({
      id: 'MX',
      name: 'Mexico',
      timezones: expect.arrayContaining(['America/Mexico_City']),
      allTimezones: expect.arrayContaining(['America/Mexico_City'])
    });
  });
});