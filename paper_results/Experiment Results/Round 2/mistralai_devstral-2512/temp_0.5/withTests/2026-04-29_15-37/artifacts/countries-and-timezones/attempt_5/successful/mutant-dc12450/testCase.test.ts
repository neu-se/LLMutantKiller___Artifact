import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country";
import data from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

describe('buildCountry timezonesMap caching', () => {
  it('should cache timezonesMap and reuse it for performance', () => {
    const startTime = Date.now();
    buildCountry(data, 'US');
    const firstCallTime = Date.now() - startTime;

    const secondStartTime = Date.now();
    buildCountry(data, 'US');
    const secondCallTime = Date.now() - secondStartTime;

    expect(secondCallTime).toBeLessThan(firstCallTime);
  });
});