import * as ct from '../../src';
import { getDeprecatedTimezones } from '../utils';

describe('getAllTimezones caching behavior', () => {
  it('should only memoize timezones when totalTimezones does not equal memoizedTimezones', () => {
    const initialTimezones = ct.getAllTimezones();
    const initialKeys = Object.keys(initialTimezones);
    const initialLength = initialKeys.length;

    // Get a timezone to trigger memoization
    ct.getTimezone('America/New_York');

    // Get all timezones again - should not re-memoize if condition is working correctly
    const secondTimezones = ct.getAllTimezones();
    const secondKeys = Object.keys(secondTimezones);
    const secondLength = secondKeys.length;

    // Both calls should return the same data
    expect(initialLength).toBe(secondLength);
    expect(initialKeys).toEqual(secondKeys);

    // Verify the data is correct (no deprecated timezones by default)
    const deprecated = getDeprecatedTimezones(secondTimezones);
    expect(Object.keys(deprecated).length).toBe(0);
  });
});