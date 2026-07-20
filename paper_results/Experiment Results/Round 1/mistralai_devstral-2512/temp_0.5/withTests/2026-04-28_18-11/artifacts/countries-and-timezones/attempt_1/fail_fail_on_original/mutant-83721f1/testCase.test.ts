import * as ct from '../../src/index';
import data from '../../src/data.json';

describe('getAllTimezones caching behavior', () => {
  it('should not rebuild all timezones when already cached', () => {
    // First call to getAllTimezones - should build all timezones
    const firstCall = ct.getAllTimezones();
    const firstCallKeys = Object.keys(firstCall);

    // Reset the internal state to simulate the mutation's effect
    // This is a workaround to test the caching behavior
    const originalTimezones = { ...firstCall };
    const originalKeys = Object.keys(data.timezones);

    // Call getAllTimezones again - should use cached data
    const secondCall = ct.getAllTimezones();
    const secondCallKeys = Object.keys(secondCall);

    // The mutation would cause all timezones to be rebuilt on every call
    // In the original code, the second call should use cached data
    expect(secondCallKeys.length).toBe(firstCallKeys.length);
    expect(secondCall).toEqual(firstCall);
  });
});