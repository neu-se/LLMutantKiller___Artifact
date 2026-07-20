import { getAllTimezones, getTimezone } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';
import data from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

describe('getAllTimezones memoization behavior', () => {
  it('should only memoize timezones when totalTimezones does not equal memoizedTimezones', () => {
    const totalTimezones = Object.keys(data.timezones).length;

    // First call to getAllTimezones - should memoize all timezones
    const firstCall = getAllTimezones();
    const firstCallKeys = Object.keys(firstCall);

    // Get a single timezone to trigger memoization
    getTimezone('America/New_York');

    // Second call to getAllTimezones - should NOT re-memoize if condition is working correctly
    const secondCall = getAllTimezones();
    const secondCallKeys = Object.keys(secondCall);

    // The keys should be the same, indicating no unnecessary re-memoization occurred
    expect(firstCallKeys).toEqual(secondCallKeys);

    // Verify the data is correct (no deprecated timezones by default)
    const hasDeprecated = Object.values(secondCall).some(tz => tz.deprecated);
    expect(hasDeprecated).toBe(false);

    // Verify the count matches expected non-deprecated timezones
    const expectedCount = totalTimezones - Object.values(data.timezones).filter(tz => tz.deprecated).length;
    expect(secondCallKeys.length).toBe(expectedCount);
  });
});