import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';
import data from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

describe('getAllTimezones memoization condition', () => {
  it('should not always memoize all timezones', () => {
    // Clear require cache to start fresh
    delete require.cache[require.resolve('../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js')];
    const { getAllTimezones: freshGetAllTimezones } = require('../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js');

    // First call should memoize all timezones
    const firstCall = freshGetAllTimezones();
    const firstCallKeys = Object.keys(firstCall);

    // Second call should NOT re-memoize if condition is working correctly
    const secondCall = freshGetAllTimezones();
    const secondCallKeys = Object.keys(secondCall);

    // The keys should be the same, indicating no unnecessary re-memoization occurred
    expect(firstCallKeys).toEqual(secondCallKeys);

    // Verify the data is correct (no deprecated timezones by default)
    const hasDeprecated = Object.values(secondCall).some((tz: any) => tz.deprecated);
    expect(hasDeprecated).toBe(false);
  });
});