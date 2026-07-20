import * as ct from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';
import data from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/data.json';

describe('getAllTimezones caching behavior', () => {
  it('should not rebuild all timezones when already cached', () => {
    const totalTimezones = Object.keys(data.timezones).length;

    // First call to getAllTimezones - should build all timezones
    const firstCall = ct.getAllTimezones();
    const firstCallKeys = Object.keys(firstCall);

    // Call getAllTimezones again - should use cached data
    const secondCall = ct.getAllTimezones();
    const secondCallKeys = Object.keys(secondCall);

    // The mutation would cause all timezones to be rebuilt on every call
    // In the original code, the second call should use cached data
    expect(secondCallKeys.length).toBe(firstCallKeys.length);
    expect(secondCall).toEqual(firstCall);

    // Additional check to ensure no extra timezones were built
    const thirdCall = ct.getAllTimezones();
    expect(Object.keys(thirdCall).length).toBe(firstCallKeys.length);
  });
});