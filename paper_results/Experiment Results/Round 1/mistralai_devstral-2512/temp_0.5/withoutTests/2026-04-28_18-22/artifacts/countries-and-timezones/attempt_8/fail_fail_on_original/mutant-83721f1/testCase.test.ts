import { getAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getAllTimezones performance optimization", () => {
  it("should avoid unnecessary memoization when all timezones are already cached", () => {
    // First call to establish baseline
    const firstCallResult = getAllTimezones();
    const firstCallKeys = Object.keys(firstCallResult);

    // Measure time for second call
    const startTime = Date.now();
    const secondCallResult = getAllTimezones();
    const secondCallTime = Date.now() - startTime;

    // Results should be identical
    expect(secondCallResult).toEqual(firstCallResult);
    expect(Object.keys(secondCallResult)).toEqual(firstCallKeys);

    // In original code: second call should be very fast (<1ms)
    // because it doesn't re-memoize when memoizedTimezones == totalTimezones
    // In mutated code: second call will be slower because it always re-memoizes
    expect(secondCallTime).toBeLessThan(1);

    // Verify consistency with third call
    const thirdCallResult = getAllTimezones();
    expect(thirdCallResult).toEqual(secondCallResult);
  });
});