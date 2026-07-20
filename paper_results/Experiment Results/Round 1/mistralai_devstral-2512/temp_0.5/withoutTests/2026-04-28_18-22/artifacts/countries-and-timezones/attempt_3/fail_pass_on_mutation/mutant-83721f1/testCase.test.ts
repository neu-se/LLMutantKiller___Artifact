import { getAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getAllTimezones memoization optimization", () => {
  it("should avoid unnecessary timezone memoization when already complete", () => {
    // First call to memoize all timezones
    const firstResult = getAllTimezones();

    // Track performance to detect unnecessary work
    const startTime = performance.now();
    const secondResult = getAllTimezones();
    const duration = performance.now() - startTime;

    // Results should be identical
    expect(secondResult).toEqual(firstResult);

    // In original code: duration should be very small (<1ms) since no memoization occurs
    // In mutated code: duration will be larger due to forced memoization
    expect(duration).toBeLessThan(1);
  });
});