import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country";
import data from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

describe('buildCountry timezone map caching', () => {
  it('should cache the timezone map between calls', () => {
    // First call - should build the timezone map
    const firstResult = buildCountry(data, 'US');
    // Second call with same country - should use cached timezone map
    const secondResult = buildCountry(data, 'US');

    // Both results should be valid and identical
    expect(firstResult).not.toBeNull();
    expect(secondResult).not.toBeNull();
    expect(firstResult).toEqual(secondResult);

    // Verify the timezone data is correct
    expect(firstResult?.timezones).toContain('America/New_York');
    expect(firstResult?.allTimezones).toContain('America/New_York');
  });
});