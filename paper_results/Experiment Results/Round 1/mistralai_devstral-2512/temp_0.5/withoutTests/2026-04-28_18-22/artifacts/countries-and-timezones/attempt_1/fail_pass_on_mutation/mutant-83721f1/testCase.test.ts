import { getAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getAllTimezones behavior", () => {
  it("should not memoize timezones when all are already memoized", () => {
    // First call should memoize all timezones
    const firstCall = getAllTimezones();
    const firstCallCount = Object.keys(firstCall).length;

    // Mock console.error to detect unnecessary memoization attempts
    const originalError = console.error;
    let errorCalled = false;
    console.error = () => {
      errorCalled = true;
    };

    // Second call should not re-memoize if all timezones are already memoized
    const secondCall = getAllTimezones();

    // Restore console.error
    console.error = originalError;

    // Both calls should return the same data
    expect(secondCall).toEqual(firstCall);
    expect(Object.keys(secondCall).length).toBe(firstCallCount);
    // In the original code, this should pass (no error)
    // In the mutated code, this will fail because memoization happens every time
    expect(errorCalled).toBe(false);
  });
});