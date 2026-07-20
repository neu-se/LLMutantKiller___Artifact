import { getAllTimezones, getTimezone } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';
import data from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

describe('getAllTimezones memoization performance', () => {
  it('should not re-memoize timezones unnecessarily', () => {
    const totalTimezones = Object.keys(data.timezones).length;

    // First call to getAllTimezones - should memoize all timezones
    const firstCall = getAllTimezones();
    const firstCallKeys = Object.keys(firstCall);

    // Get all individual timezones to ensure memoization is complete
    Object.keys(data.timezones).forEach(getTimezone);

    // Second call to getAllTimezones - should NOT re-memoize if condition is working correctly
    const secondCall = getAllTimezones();
    const secondCallKeys = Object.keys(secondCall);

    // The keys should be the same, indicating no unnecessary re-memoization occurred
    expect(firstCallKeys).toEqual(secondCallKeys);

    // Verify the data is correct (no deprecated timezones by default)
    const hasDeprecated = Object.values(secondCall).some((tz: any) => tz.deprecated);
    expect(hasDeprecated).toBe(false);
  });
});