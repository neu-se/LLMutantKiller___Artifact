import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country";
import data from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

describe('buildCountry timezone map caching', () => {
  it('should cache the timezone map between calls', () => {
    // First call - should build the timezone map
    const firstResult = buildCountry(data, 'US');
    // Second call with different country - should use cached timezone map
    const secondResult = buildCountry(data, 'MX');

    // Both results should be valid and different
    expect(firstResult).not.toBeNull();
    expect(secondResult).not.toBeNull();
    expect(firstResult?.id).toBe('US');
    expect(secondResult?.id).toBe('MX');

    // Verify the timezone data is correct for both countries
    expect(firstResult?.timezones).toContain('America/New_York');
    expect(secondResult?.timezones).toContain('America/Mexico_City');
  });
});