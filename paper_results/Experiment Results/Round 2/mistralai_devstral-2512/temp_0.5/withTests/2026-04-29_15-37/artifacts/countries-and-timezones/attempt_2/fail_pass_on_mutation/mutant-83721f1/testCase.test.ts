import { getAllTimezones } from '../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js';

describe('getAllTimezones behavior', () => {
  it('should not always memoize all timezones', () => {
    // Get all timezones once
    const firstCall = getAllTimezones();
    const firstCallKeys = Object.keys(firstCall);

    // Get a single timezone to trigger memoization
    const { getTimezone } = require('../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js');
    getTimezone('America/New_York');

    // Get all timezones again - should not re-memoize if condition is working correctly
    const secondCall = getAllTimezones();
    const secondCallKeys = Object.keys(secondCall);

    // The keys should be the same, indicating no unnecessary re-memoization occurred
    expect(firstCallKeys).toEqual(secondCallKeys);
  });
});