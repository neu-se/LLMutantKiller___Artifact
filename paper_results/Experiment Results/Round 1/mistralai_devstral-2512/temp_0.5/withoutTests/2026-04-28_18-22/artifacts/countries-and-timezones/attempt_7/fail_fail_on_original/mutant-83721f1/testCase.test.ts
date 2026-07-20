import { getAllTimezones } from "../../../../../../../../../../../subject_repositories/countries-and-timezones/src/index.js";

describe("getAllTimezones memoization behavior", () => {
  it("should only memoize timezones when not all are already memoized", () => {
    // First call to memoize all timezones
    const firstResult = getAllTimezones();
    const firstKeys = Object.keys(firstResult);

    // Second call should return the same data without re-memoization
    const secondResult = getAllTimezones();
    const secondKeys = Object.keys(secondResult);

    // Results should be identical
    expect(secondResult).toEqual(firstResult);
    expect(secondKeys).toEqual(firstKeys);

    // The key difference is in the mutation condition:
    // Original: if (totalTimezones !== memoizedTimezones)
    // Mutated: if (true)
    // This causes the mutated version to always attempt memoization

    // We can detect this by checking if the function returns
    // the exact same object reference when called multiple times
    // In original code: after first call, memoizedTimezones == totalTimezones
    // so subsequent calls return the same object
    // In mutated code: it always tries to memoize, potentially creating new objects
    expect(secondResult).toBe(firstResult);

    // Third call to verify consistent behavior
    const thirdResult = getAllTimezones();
    expect(thirdResult).toEqual(secondResult);
    expect(thirdResult).toBe(secondResult);
  });
});