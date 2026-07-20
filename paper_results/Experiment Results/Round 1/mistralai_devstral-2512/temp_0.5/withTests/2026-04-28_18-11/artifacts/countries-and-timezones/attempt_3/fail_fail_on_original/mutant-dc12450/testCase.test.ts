import buildCountry from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/build-country";
import data from "../../../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json";

describe('buildCountry timezone map caching behavior', () => {
  it('should maintain consistent timezone map caching between multiple calls', () => {
    // Clear any cached timezone map by using a fresh data object
    const firstData = JSON.parse(JSON.stringify(data));
    const secondData = JSON.parse(JSON.stringify(data));

    // First call with first data object
    const firstResult = buildCountry(firstData, 'US');

    // Second call with second data object (should use cached map if mutation exists)
    const secondResult = buildCountry(secondData, 'MX');

    // Modify the first data object's timezone data
    firstData.timezones['America/New_York'].c = ['XX'];

    // Third call with modified first data object
    const thirdResult = buildCountry(firstData, 'XX');

    // In original code: thirdResult should have empty timezones (no caching issue)
    // In mutated code: thirdResult will incorrectly use stale cached map
    expect(thirdResult?.timezones.length).toBe(0);
  });
});