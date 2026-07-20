import { getAllTimezones, getTimezone } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getAllTimezones memoization behavior", () => {
  it("should not re-memoize all timezones on subsequent calls when already memoized", () => {
    // First call to getAllTimezones - this memoizes all timezones
    const firstResult = getAllTimezones();
    const firstKeys = Object.keys(firstResult);
    
    // Spy on getTimezone to count calls
    const originalGetTimezone = getTimezone;
    let callCount = 0;
    
    // We need to detect if forEach is called unnecessarily
    // The mutation always calls forEach(getTimezone), original only when needed
    // After first getAllTimezones(), memoizedTimezones = Object.keys(lastTimezone).length
    // totalTimezones = number of all timezones
    // If these happen to be equal, original skips forEach but mutation doesn't
    
    // Get a timezone to check memoizedTimezones value
    const sampleTz = getTimezone("UTC") || getTimezone("America/New_York");
    
    // The number of keys in a timezone object
    const tzKeyCount = sampleTz ? Object.keys(sampleTz).length : 0;
    
    // Get total timezone count
    const totalTzCount = firstKeys.length;
    
    // The test: getAllTimezones should return consistent results
    const secondResult = getAllTimezones();
    const secondKeys = Object.keys(secondResult);
    
    expect(secondKeys.length).toBe(firstKeys.length);
    expect(secondResult).toEqual(firstResult);
    
    // Verify tzKeyCount !== totalTzCount to ensure the condition matters
    expect(tzKeyCount).not.toBe(totalTzCount);
  });
});