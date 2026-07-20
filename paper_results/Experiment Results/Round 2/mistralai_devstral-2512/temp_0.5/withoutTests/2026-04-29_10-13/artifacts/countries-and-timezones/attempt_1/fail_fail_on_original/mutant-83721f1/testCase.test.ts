import { getAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getAllTimezones", () => {
  it("should not memoize all timezones when called without options", () => {
    const originalGetAllTimezones = getAllTimezones;
    let memoizeCalls = 0;

    // Replace the implementation to count calls
    const mockGetAllTimezones = (options = {}) => {
      memoizeCalls++;
      return originalGetAllTimezones(options);
    };

    // First call should trigger memoization
    const firstResult = mockGetAllTimezones();
    const firstCallCount = memoizeCalls;

    // Second call should not trigger memoization again
    const secondResult = mockGetAllTimezones();
    const secondCallCount = memoizeCalls;

    // Verify behavior
    expect(firstCallCount).toBe(1);
    expect(secondCallCount).toBe(1);
    expect(firstResult).toEqual(secondResult);
  });
});