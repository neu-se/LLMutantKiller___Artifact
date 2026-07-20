import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country";
import { timezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

describe('buildCountry timezone map caching', () => {
  it('should cache timezone map correctly between multiple calls', () => {
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

    // Verify both results are correct
    expect(firstResult).not.toBeNull();
    expect(secondResult).not.toBeNull();
    expect(firstResult?.timezones).toContain('America/New_York');
    expect(secondResult?.timezones).toContain('America/Mexico_City');

    // Modify timezone data
    mockData.timezones['America/New_York'].c = ['XX'];
    mockData.countries['XX'] = 'Test Country';

    // Third call with modified data - should use fresh map in original code
    const thirdResult = buildCountry(mockData, 'XX');

    // In original: thirdResult should have the updated timezone
    // In mutated: thirdResult will use stale cached map (no timezones)
    expect(thirdResult?.timezones).toContain('America/New_York');
  });
});