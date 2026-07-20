import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country";

describe('buildCountry timezone map caching', () => {
  it('should rebuild timezone map when data changes', () => {
    const mockData1 = {
      countries: { US: 'United States' },
      timezones: {
        'America/New_York': { c: ['US'] },
        'America/Chicago': { c: ['US'] }
      }
    };

    const mockData2 = {
      countries: { US: 'United States' },
      timezones: {
        'America/New_York': { c: ['US'] },
        'America/Chicago': { c: ['US'] },
        'America/Denver': { c: ['US'] }
      }
    };

    // First call with first data set
    const firstResult = buildCountry(mockData1, 'US');
    // Second call with second data set (different object)
    const secondResult = buildCountry(mockData2, 'US');

    // Original code: should include Denver (new timezone map built)
    // Mutated code: won't include Denver (uses stale cached map)
    expect(secondResult?.timezones).toContain('America/Denver');
  });
});