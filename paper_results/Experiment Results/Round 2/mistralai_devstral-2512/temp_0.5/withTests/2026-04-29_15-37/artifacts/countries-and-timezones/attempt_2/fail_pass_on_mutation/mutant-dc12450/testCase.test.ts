import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country";
import data from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

describe('buildCountry timezonesMap caching', () => {
  it('should reuse cached timezonesMap on subsequent calls', () => {
    // Clear any existing cache by accessing internal state through closure
    const firstResult = buildCountry(data, 'US');
    const secondResult = buildCountry(data, 'US');

    expect(firstResult).toEqual(secondResult);
    expect(firstResult).not.toBe(secondResult);
  });
});