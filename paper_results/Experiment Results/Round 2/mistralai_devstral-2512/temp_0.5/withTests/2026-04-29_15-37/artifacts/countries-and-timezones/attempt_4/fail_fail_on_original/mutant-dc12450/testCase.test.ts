import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country";
import data from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

describe('buildCountry timezonesMap caching', () => {
  it('should cache timezonesMap and not rebuild it unnecessarily', () => {
    const firstCall = buildCountry(data, 'US');
    const secondCall = buildCountry(data, 'US');

    expect(firstCall).toEqual(secondCall);
    expect(firstCall).toBe(secondCall);
  });
});