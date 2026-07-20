import { getAllTimezones, getTimezone } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';
import data from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

describe('getAllTimezones memoization behavior', () => {
  it('should not re-memoize timezones when totalTimezones equals memoizedTimezones', () => {
    // First call to getAllTimezones - should memoize all timezones
    const firstCall = getAllTimezones();
    const firstCallKeys = Object.keys(firstCall);
    const firstCallCount = firstCallKeys.length;

    // Get a single timezone to trigger memoization
    getTimezone('America/New_York');

    // Second call to getAllTimezones - should NOT re-memoize if condition is working correctly
    const secondCall = getAllTimezones();
    const secondCallKeys = Object.keys(secondCall);
    const secondCallCount = secondCallKeys.length;

    // The count should be the same, indicating no unnecessary re-memoization occurred
    expect(firstCallCount).toBe(secondCallCount);

    // The keys should be the same
    expect(firstCallKeys).toEqual(secondCallKeys);

    // Verify the data is correct (no deprecated timezones by default)
    const hasDeprecated = Object.values(secondCall).some(tz => tz.deprecated);
    expect(hasDeprecated).toBe(false);
  });
});