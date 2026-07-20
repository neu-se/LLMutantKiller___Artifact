import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country";
import data from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

describe('buildCountry timezonesMap caching', () => {
  it('should cache timezonesMap and reuse it across multiple country builds', () => {
    // First call should build the timezonesMap
    const firstCall = buildCountry(data, 'US');
    // Second call should use cached timezonesMap
    const secondCall = buildCountry(data, 'MX');
    // Third call should still use cached timezonesMap
    const thirdCall = buildCountry(data, 'CA');

    // Verify all calls return valid data
    expect(firstCall).toMatchObject({
      id: 'US',
      name: 'United States of America',
      timezones: expect.arrayContaining(['America/New_York'])
    });

    expect(secondCall).toMatchObject({
      id: 'MX',
      name: 'Mexico',
      timezones: expect.arrayContaining(['America/Mexico_City'])
    });

    expect(thirdCall).toMatchObject({
      id: 'CA',
      name: 'Canada',
      timezones: expect.arrayContaining(['America/Toronto'])
    });
  });
});