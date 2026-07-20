import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country";

describe('buildCountry timezone map caching', () => {
  it('should cache timezone map between calls with same data object', () => {
    const mockData = {
      countries: { US: 'United States', MX: 'Mexico' },
      timezones: {
        'America/New_York': { c: ['US'] },
        'America/Mexico_City': { c: ['MX'] }
      }
    };

    // First call - builds timezone map
    const firstResult = buildCountry(mockData, 'US');
    // Second call - should use cached map
    const secondResult = buildCountry(mockData, 'MX');

    // Both should work correctly
    expect(firstResult?.timezones).toContain('America/New_York');
    expect(secondResult?.timezones).toContain('America/Mexico_City');

    // Modify the timezone data
    mockData.timezones['America/New_York'].c = ['XX'];
    mockData.countries['XX'] = 'Test Country';

    // Third call with modified data - should use fresh map
    const thirdResult = buildCountry(mockData, 'XX');

    // Original: should have empty timezones (country not in original map)
    // Mutated: will incorrectly use stale cached map
    expect(thirdResult?.timezones.length).toBe(0);
  });
});